import React, { useRef, useEffect, useState, useCallback } from 'react';

type SpacecraftState = {
  x: number;         // Horizontal position
  y: number;         // Vertical position
  vx: number;        // Horizontal velocity
  vy: number;        // Vertical velocity
  rotation: number;  // Angle in radians
  vr: number;        // Angular velocity (rotation speed)
};

const DockingSimulatorGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spacecraftState, setSpacecraftState] = useState<SpacecraftState>({
    x: 100, // Initial position
    y: 100,
    vx: 0,
    vy: 0,
    rotation: 0, // Initial rotation (0 radians = facing right)
    vr: 0,
  });
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [gameRunning, setGameRunning] = useState(true);
  const canvasSizeRef = useRef({ width: 800, height: 600 });
  const gameRunningRef = useRef(gameRunning);
  const spacecraftStateRef = useRef(spacecraftState);

  // Define physics constants
  const thrustPower = 0.05; // How much acceleration thrust provides
  const torquePower = 0.005; // How much angular acceleration torque provides
  const damping = 0.99; // Velocity damping
  const angularDamping = 0.98; // Angular velocity damping

  // Define ISS and Docking Port position (adjust as needed)
  const issX = canvasSizeRef.current.width * 0.75;
  const issY = canvasSizeRef.current.height * 0.5;
  const dockingPortX = issX; // Docking port is below the ISS rectangle example
  const dockingPortY = issY + 20;
  const dockingDistanceThreshold = 15; // Distance for successful docking
  const dockingRotationThreshold = Math.PI / 10; // +/- 18 degrees rotation tolerance

  useEffect(() => {
    gameRunningRef.current = gameRunning;
  }, [gameRunning]);

  useEffect(() => {
    spacecraftStateRef.current = spacecraftState;
  }, [spacecraftState]);

  // Initialize canvas size
  useEffect(() => {
    const updateCanvasSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        canvasSizeRef.current = {
          width: container.clientWidth,
          height: 600
        };
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = canvasSizeRef.current.width;
          canvas.height = canvasSizeRef.current.height;
        }
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Movement controls
  const moveForward = useCallback(() => {
    if (!gameRunningRef.current) return;
    setSpacecraftState(prevState => ({
      ...prevState,
      vx: prevState.vx + Math.cos(prevState.rotation) * thrustPower,
      vy: prevState.vy + Math.sin(prevState.rotation) * thrustPower,
    }));
  }, [thrustPower]);

  const rotateLeft = useCallback(() => {
    if (!gameRunningRef.current) return;
    setSpacecraftState(prevState => ({
      ...prevState,
      vr: prevState.vr - torquePower,
    }));
  }, [torquePower]);

  const rotateRight = useCallback(() => {
    if (!gameRunningRef.current) return;
    setSpacecraftState(prevState => ({
      ...prevState,
      vr: prevState.vr + torquePower,
    }));
  }, [torquePower]);

  // Update the spacecraft state based on physics
  const updateState = useCallback((dt: number) => {
    if (!gameRunningRef.current) return;
    setSpacecraftState(prevState => ({
      x: prevState.x + prevState.vx * dt,
      y: prevState.y + prevState.vy * dt,
      vx: prevState.vx * damping,
      vy: prevState.vy * damping,
      rotation: prevState.rotation + prevState.vr * dt,
      vr: prevState.vr * angularDamping,
    }));
  }, [damping, angularDamping]);

  // Draw the ISS and docking port
  const drawISS = useCallback((ctx: CanvasRenderingContext2D) => {
    // Draw ISS (rectangle)
    ctx.save();
    ctx.fillStyle = '#444';
    ctx.fillRect(issX - 50, issY - 20, 100, 40);
    // Draw docking port (circle)
    ctx.fillStyle = '#0ff';
    ctx.beginPath();
    ctx.arc(dockingPortX, dockingPortY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [issX, issY, dockingPortX, dockingPortY]);

  // Check for successful docking
  const isDocked = useCallback((spacecraft: SpacecraftState) => {
    const dx = spacecraft.x - dockingPortX;
    const dy = spacecraft.y - dockingPortY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Check distance
    const closeEnough = distance < dockingDistanceThreshold;

    // Check rotation (optional but good for realism)
    // Calculate angle from spacecraft to docking port
    const angleToDock = Math.atan2(dockingPortY - spacecraft.y, dockingPortX - spacecraft.x);
    // Normalize angles to be within a comparable range (e.g., -PI to PI)
    const normalizedSpacecraftRotation = Math.atan2(Math.sin(spacecraft.rotation), Math.cos(spacecraft.rotation));
    const normalizedAngleToDock = Math.atan2(Math.sin(angleToDock), Math.cos(angleToDock));
    
    let angleDiff = Math.abs(normalizedSpacecraftRotation - normalizedAngleToDock);
    // Adjust angleDiff for the shortest path around the circle
    if (angleDiff > Math.PI) {
      angleDiff = 2 * Math.PI - angleDiff;
    }

    const alignedEnough = angleDiff < dockingRotationThreshold;

    return closeEnough && alignedEnough;
  }, [dockingPortX, dockingPortY, dockingDistanceThreshold, dockingRotationThreshold]);

  // Game loop and drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const gameLoop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000; // Time delta in seconds
      lastTime = currentTime;

      if (gameRunningRef.current) {
        updateState(dt); // Update state based on time delta

        // Check for docking
        if (isDocked(spacecraftStateRef.current)) {
          setGameMessage('Docking successful!');
          setGameRunning(false); // Stop the game
        }

        // Basic collision detection with ISS (simple rectangle bounds check)
        // This is a placeholder and can be made more sophisticated.
        // Check if spacecraft center is within ISS rectangle bounds (excluding docking port area)
        const spacecraftSize = 10; // Approximate size
        const issLeft = issX - 50;
        const issRight = issX + 50;
        const issTop = issY - 20;
        const issBottom = issY + 20;

        const isCollidingWithISS = (
          spacecraftStateRef.current.x > issLeft &&
          spacecraftStateRef.current.x < issRight &&
          spacecraftStateRef.current.y > issTop &&
          spacecraftStateRef.current.y < issBottom
        );

        // Avoid registering a collision if the spacecraft is within the docking port area
        const atDockingPortArea = (
            spacecraftStateRef.current.x > dockingPortX - dockingDistanceThreshold &&
            spacecraftStateRef.current.x < dockingPortX + dockingDistanceThreshold &&
            spacecraftStateRef.current.y > dockingPortY - dockingDistanceThreshold &&
            spacecraftStateRef.current.y < dockingPortY + dockingDistanceThreshold
        );

        if (isCollidingWithISS && !atDockingPortArea) {
           setGameMessage('Collision! Mission failed.');
           setGameRunning(false); // Stop the game
        }

      }

      // Clear canvas
      context.fillStyle = '#0a0a1a'; // Space background
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ISS and docking port
      drawISS(context);

      // Draw spacecraft if game is running or just finished (to show final position)
      if (gameRunningRef.current || gameMessage !== null) {
         context.save();
         context.translate(spacecraftStateRef.current.x, spacecraftStateRef.current.y);
         context.rotate(spacecraftStateRef.current.rotation);
         context.fillStyle = gameRunningRef.current ? '#ffffff' : (gameMessage === 'Docking successful!' ? '#00ff00' : '#ff0000'); // Change color on win/lose
         // Simple triangle for spacecraft
         context.beginPath();
         context.moveTo(15, 0);
         context.lineTo(-10, -10);
         context.lineTo(-10, 10);
         context.closePath();
         context.fill();
         context.restore();
      }

      // Display game message
      if (gameMessage) {
        context.fillStyle = gameMessage === 'Docking successful!' ? '#00ff00' : '#ff0000';
        context.font = '36px Arial';
        context.textAlign = 'center';
        context.fillText(gameMessage, canvas.width / 2, canvas.height / 2);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop(lastTime);

    // Cleanup function to cancel animation frame
    return () => {
      cancelAnimationFrame(animationFrameId);
    };

  }, [updateState, isDocked, drawISS, gameMessage, issX, issY, dockingPortX, dockingPortY, dockingDistanceThreshold]);

  // Input Handling (Keyboard)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameRunningRef.current) return;
      
      if (['ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        const canvas = canvasRef.current;
        if (canvas && document.activeElement === canvas) {
          event.preventDefault();
          switch (event.key) {
            case 'ArrowUp':
              moveForward();
              break;
            case 'ArrowLeft':
              rotateLeft();
              break;
            case 'ArrowRight':
              rotateRight();
              break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveForward, rotateLeft, rotateRight]);

  return (
    <div className="w-full flex justify-center bg-space-800/80 rounded-lg p-4">
      <canvas 
        ref={canvasRef} 
        className="border border-space-700/50 rounded-lg" 
        tabIndex={0} // Make canvas focusable
      />
    </div>
  );
};

export default DockingSimulatorGame; 