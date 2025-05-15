import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, RotateCcw, Gauge, Fuel, ArrowUp } from "lucide-react";

const RocketLaunch = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [fuel, setFuel] = useState(100);
  const [thrust, setThrust] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [gravity, setGravity] = useState(1.62); // Moon gravity
  const [destination, setDestination] = useState("moon");
  const [status, setStatus] = useState("preparing");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [landed, setLanded] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [targetAltitude, setTargetAltitude] = useState(10000);
  const [safeVelocity, setSafeVelocity] = useState(5);
  const [lastTime, setLastTime] = useState(0);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  // Game variables
  const moonTarget = 10000; // meters
  const marsTarget = 20000; // meters
  const targetAltitude = destination === "moon" ? moonTarget : marsTarget;

  const resetGame = () => {
    setAltitude(0);
    setVelocity(0);
    setFuel(100);
    setThrust(0);
    setMessage('');
    setStatus("preparing");
    setScore(0);
    setLanded(false);
    setCrashed(false);
    setLastTime(0);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Reset game variables
      resetGame();
      
      // Start animation loop
      startAnimation();
      
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [gameStarted, gameOver]);

  const startAnimation = () => {
    let lastTime: number | null = null;
    
    const animate = (time: number) => {
      if (lastTime === null) {
        lastTime = time;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate delta time in seconds
      const deltaTime = Math.min((time - lastTime) / 1000, 0.1); // Cap deltaTime to prevent physics glitches
      lastTime = time;
      
      updateGameState(deltaTime);
      renderGame();
      
      // Fix: Only check landing conditions when altitude is near target
      if (!gameOver && fuel > 0) {
        if (Math.abs(altitude - targetAltitude) < 10) {
          // Close to landing zone
          if (Math.abs(velocity) <= safeVelocity) {
            setStatus("success");
            setMessage("Successful landing! Well done commander!");
            setScore(Math.floor(fuel * 100 + (safeVelocity - Math.abs(velocity)) * 50));
            setGameOver(true);
            setLanded(true);
          } else if (velocity < 0) { // Velocity should be negative (descending)
            setStatus("crashed");
            setMessage(`Crash landing! Your velocity was too high (${Math.abs(velocity).toFixed(1)} m/s)`);
            setScore(Math.floor(fuel * 10));
            setGameOver(true);
            setCrashed(true);
          }
        } else if (altitude > targetAltitude + 100) {
          // Passed the target by too much
          setStatus("failed");
          setMessage("You've overshot the landing zone! Mission failed.");
          setGameOver(true);
          setCrashed(true);
        } else if (altitude < 0) {
          // Crashed into the ground
          setStatus("crashed");
          setMessage("You crashed into the ground! Mission failed.");
          setGameOver(true);
          setCrashed(true);
        }
      } else if (fuel <= 0 && altitude < targetAltitude * 0.9) {
        // Out of fuel and not close to target
        setStatus("failed");
        setMessage("Out of fuel! Mission failed.");
        setGameOver(true);
        setCrashed(true);
      }
      
      if (!gameOver) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
  };

  const updateGameState = (deltaTime: number) => {
    // Calculate thrust force based on current thrust setting
    // Fix: Adjust thrust sensitivity for better control
    const thrustForce = thrust * 0.3; // Reduced scale factor for better control
    
    // Calculate acceleration (F = ma, a = F/m)
    // As fuel depletes, the rocket gets lighter, so acceleration increases
    const mass = 1 + (fuel / 100); // Simplistic model
    const acceleration = (thrustForce / mass) - gravity;
    
    // Update velocity
    const newVelocity = velocity + acceleration * deltaTime;
    setVelocity(newVelocity);
    
    // Update altitude
    const newAltitude = altitude + newVelocity * deltaTime;
    setAltitude(Math.max(0, newAltitude));
    
    // Consume fuel
    if (thrust > 0) {
      // Fix: Adjust fuel consumption for better gameplay
      const newFuel = fuel - (thrust / 30) * deltaTime; // Reduced fuel consumption
      setFuel(Math.max(0, newFuel));
    }
    
    // Update message based on velocity and altitude
    if (Math.abs(velocity) > 20) {
      setMessage("Warning: Velocity too high!");
    } else if (velocity < 0 && altitude > targetAltitude * 0.9 && altitude < targetAltitude * 1.1) {
      setMessage("Preparing for landing, reduce velocity!");
    } else if (altitude > targetAltitude * 0.5 && altitude < targetAltitude * 0.9) {
      setMessage("Approaching destination, prepare for landing sequence.");
    } else if (altitude > targetAltitude * 0.25) {
      setMessage("Halfway there, monitor your fuel consumption.");
    }
  };

  const renderGame = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#1A1F2C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    drawStars(ctx, canvas);
    
    // Draw destination (moon or mars)
    drawDestination(ctx, canvas);
    
    // Draw rocket
    drawRocket(ctx, canvas);
  };

  const drawStars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.fillStyle = 'white';
    
    // Create a starfield
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      const opacity = Math.random() * 0.8 + 0.2;
      
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
  };

  const drawDestination = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Calculate position based on altitude
    const progress = Math.min(altitude / targetAltitude, 1);
    const y = canvas.height - (canvas.height * progress);
    
    if (destination === "moon") {
      // Draw the moon
      ctx.fillStyle = '#C1C1C1';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, y, 50, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw craters
      ctx.fillStyle = '#A0A0A0';
      for (let i = 0; i < 8; i++) {
        const craterX = canvas.width / 2 + Math.cos(i / 8 * Math.PI * 2) * 30;
        const craterY = y + Math.sin(i / 8 * Math.PI * 2) * 30;
        const size = 5 + Math.random() * 10;
        
        ctx.beginPath();
        ctx.arc(craterX, craterY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Draw Mars
      ctx.fillStyle = '#D76545';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, y, 50, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw Mars features
      ctx.fillStyle = '#C45535';
      for (let i = 0; i < 5; i++) {
        const featureX = canvas.width / 2 + Math.cos(i / 5 * Math.PI * 2) * 30;
        const featureY = y + Math.sin(i / 5 * Math.PI * 2) * 30;
        const size = 10 + Math.random() * 15;
        
        ctx.beginPath();
        ctx.arc(featureX, featureY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawRocket = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Calculate rocket position based on altitude
    // Fix: Improve visibility of rocket relative to destination
    const maxVisibleAltitude = targetAltitude * 0.3; // Show more of the journey on screen
    const progress = Math.min(altitude / maxVisibleAltitude, 1);
    const y = canvas.height - 100 - (canvas.height * 0.6 * progress);
    const x = canvas.width / 2;
    
    ctx.save();
    ctx.translate(x, y);
    
    // Draw rocket body
    ctx.fillStyle = '#EEEEEE';
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(10, 0);
    ctx.lineTo(10, 20);
    ctx.lineTo(-10, 20);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fill();
    
    // Draw rocket nose
    ctx.fillStyle = '#D76545';
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(10, 0);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fill();
    
    // Draw fins
    ctx.fillStyle = '#8B5CF6';
    
    // Left fin
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-20, 30);
    ctx.lineTo(-10, 20);
    ctx.closePath();
    ctx.fill();
    
    // Right fin
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(20, 30);
    ctx.lineTo(10, 20);
    ctx.closePath();
    ctx.fill();
    
    // Draw flame if thrust is applied
    if (thrust > 0 && fuel > 0) {
      const flameSize = thrust / 25;
      
      // Outer flame
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.moveTo(-5, 20);
      ctx.lineTo(0, 20 + 30 * flameSize + Math.random() * 10);
      ctx.lineTo(5, 20);
      ctx.closePath();
      ctx.fill();
      
      // Inner flame
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.moveTo(-3, 20);
      ctx.lineTo(0, 20 + 20 * flameSize + Math.random() * 5);
      ctx.lineTo(3, 20);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  };

  const handleThrustChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThrust(Number(e.target.value));
  };

  const handleRestart = () => {
    resetGame();
    setGameStarted(true);
    setGameOver(false);
    setDestination(destination === "moon" ? "mars" : "moon");
    setGravity(destination === "moon" ? 1.62 : 3.72);
    setTargetAltitude(destination === "moon" ? moonTarget : marsTarget);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/games"
          className="inline-flex items-center text-sm text-cosmos-purple hover:text-cosmos-blue transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rocket Launch Simulator
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Launch your rocket and land safely on the Moon or Mars. Control your thrust to manage your ascent and descent.
            </p>
          </div>

          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden">
            {!gameStarted ? (
              <div className="p-12 text-center">
                <Rocket className="h-16 w-16 text-cosmos-purple mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-6">
                  Ready for liftoff?
                </h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                  Select your destination and prepare for launch. Control your rocket's thrust to manage your fuel consumption and velocity for a safe landing.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Select Destination</h3>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setDestination("moon")}
                      className={`p-4 rounded-lg transition-all ${
                        destination === "moon" 
                          ? "bg-cosmos-purple/30 border-2 border-cosmos-purple" 
                          : "bg-space-700/50 border border-space-600 hover:bg-space-700"
                      }`}
                    >
                      <div className="w-20 h-20 bg-gray-300 rounded-full mb-3 mx-auto"></div>
                      <span className="font-medium text-white">Moon</span>
                      <p className="text-xs text-gray-400 mt-1">Distance: 10,000m</p>
                      <p className="text-xs text-gray-400">Gravity: 1.62 m/s²</p>
                    </button>
                    
                    <button
                      onClick={() => setDestination("mars")}
                      className={`p-4 rounded-lg transition-all ${
                        destination === "mars" 
                          ? "bg-cosmos-purple/30 border-2 border-cosmos-purple" 
                          : "bg-space-700/50 border border-space-600 hover:bg-space-700"
                      }`}
                    >
                      <div className="w-20 h-20 bg-red-500 rounded-full mb-3 mx-auto"></div>
                      <span className="font-medium text-white">Mars</span>
                      <p className="text-xs text-gray-400 mt-1">Distance: 20,000m</p>
                      <p className="text-xs text-gray-400">Gravity: 3.72 m/s²</p>
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => setGameStarted(true)}
                  className="space-button inline-flex items-center justify-center"
                >
                  Start Mission
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={600}
                      className="w-full h-[500px] bg-space-900 rounded-lg"
                    />
                  </div>
                  
                  <div className="bg-space-700/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Mission Control</h3>
                    
                    {/* Status display */}
                    <div className="mb-6">
                      <div className={`p-3 rounded-md ${
                        status === "launching" ? "bg-cosmos-blue/20 border border-cosmos-blue/50" :
                        status === "success" ? "bg-green-500/20 border border-green-500/50" :
                        "bg-red-500/20 border border-red-500/50"
                      }`}>
                        <p className="text-sm font-medium text-white">
                          {message}
                        </p>
                      </div>
                    </div>
                    
                    {/* Gauges */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Gauge className="h-4 w-4 mr-2 text-cosmos-blue" />
                            <span className="text-sm text-gray-300">Altitude</span>
                          </div>
                          <span className="text-white font-mono">{Math.floor(altitude)}m</span>
                        </div>
                        <div className="w-full h-2 bg-space-600 rounded-full">
                          <div 
                            className="h-full bg-cosmos-blue rounded-full transition-all"
                            style={{ width: `${(altitude / targetAltitude) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0m</span>
                          <span>{targetAltitude}m</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <ArrowUp className="h-4 w-4 mr-2 text-yellow-400" />
                            <span className="text-sm text-gray-300">Velocity</span>
                          </div>
                          <span className={`font-mono ${
                            Math.abs(velocity) > safeVelocity ? "text-red-400" : "text-white"
                          }`}>{velocity.toFixed(1)} m/s</span>
                        </div>
                        <div className="w-full h-2 bg-space-600 rounded-full">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              Math.abs(velocity) > safeVelocity * 2 ? "bg-red-500" :
                              Math.abs(velocity) > safeVelocity ? "bg-yellow-400" : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(Math.abs(velocity) * 5, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 text-right">
                          Safe landing: &lt;{safeVelocity} m/s
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Fuel className="h-4 w-4 mr-2 text-cosmos-purple" />
                            <span className="text-sm text-gray-300">Fuel</span>
                          </div>
                          <span className={`font-mono ${
                            fuel < 20 ? "text-red-400" : "text-white"
                          }`}>{Math.floor(fuel)}%</span>
                        </div>
                        <div className="w-full h-2 bg-space-600 rounded-full">
                          <div 
                            className="h-full bg-cosmos-purple rounded-full transition-all"
                            style={{ width: `${fuel}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Thrust control */}
                      {!gameOver && (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <Rocket className="h-4 w-4 mr-2 text-orange-400" />
                              <span className="text-sm text-gray-300">Thrust</span>
                            </div>
                            <span className="font-mono text-white">{thrust}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={thrust}
                            onChange={handleThrustChange}
                            className="w-full h-6 accent-cosmos-purple"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Game over and score */}
                    {gameOver && (
                      <div className="mt-6">
                        <div className={`p-4 rounded-lg mb-4 ${
                          status === "success" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}>
                          <h4 className="font-bold text-white mb-1">Mission {status === "success" ? "Successful" : "Failed"}</h4>
                          <p className="text-gray-300 text-sm">{message}</p>
                        </div>
                        
                        <div className="text-center mb-4">
                          <p className="text-gray-300 mb-1">Final Score</p>
                          <p className="text-3xl font-bold text-cosmos-purple">{score}</p>
                        </div>
                        
                        <button
                          onClick={handleRestart}
                          className="w-full space-button flex items-center justify-center"
                        >
                          <RotateCcw className="mr-2 h-5 w-5" />
                          Launch Again
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-space-800/50 backdrop-blur-sm border border-space-700/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-cosmos-purple/20 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                <span>Control your rocket's thrust using the slider - higher thrust means faster acceleration but uses more fuel.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-cosmos-purple/20 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                <span>Monitor your velocity - you'll need to land with a velocity of less than {safeVelocity} m/s to safely land.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-cosmos-purple/20 rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                <span>Manage your fuel carefully - once you run out, your rocket will be at the mercy of gravity!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RocketLaunch;
