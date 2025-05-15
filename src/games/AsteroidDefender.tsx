import { useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';

const AsteroidDefender = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<{
    ship: { x: number; y: number; rotation: number };
    lasers: { x: number; y: number; rotation: number }[];
    asteroids: { x: number; y: number; rotation: number; size: number; speed: number }[];
    score: number;
    gameOver: boolean;
  }>({
    ship: { x: 0, y: 0, rotation: 0 },
    lasers: [],
    asteroids: [],
    score: 0,
    gameOver: false
  });

  const keys: { [key: string]: boolean } = {};
  let lastTime = 0;
  let asteroidInterval = 1000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameRef.current.ship.x = canvas.width / 2;
      gameRef.current.ship.y = canvas.height / 2;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
      if (e.key === ' ') keys[' '] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = (time: number) => {
      if (!ctx || !canvas) return;

      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(x, y, size, size);
      }

      if (keys['arrowleft']) gameRef.current.ship.rotation -= 0.1;
      if (keys['arrowright']) gameRef.current.ship.rotation += 0.1;

      ctx.save();
      ctx.translate(gameRef.current.ship.x, gameRef.current.ship.y);
      ctx.rotate(gameRef.current.ship.rotation);

      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-10, -10);
      ctx.lineTo(-10, 10);
      ctx.closePath();
      ctx.fillStyle = '#fff';
      ctx.fill();

      const gradient = ctx.createLinearGradient(-10, 0, -20, 0);
      gradient.addColorStop(0, 'rgba(255, 100, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-10, -5);
      ctx.lineTo(-20, 0);
      ctx.lineTo(-10, 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      if (keys[' '] && gameRef.current.lasers.length < 5) {
        gameRef.current.lasers.push({
          x: gameRef.current.ship.x,
          y: gameRef.current.ship.y,
          rotation: gameRef.current.ship.rotation
        });
      }

      gameRef.current.lasers = gameRef.current.lasers.filter(laser => {
        laser.x += Math.cos(laser.rotation) * 10;
        laser.y += Math.sin(laser.rotation) * 10;

        ctx.save();
        ctx.translate(laser.x, laser.y);
        ctx.rotate(laser.rotation);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 0);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 5);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        return laser.x > 0 && laser.x < canvas.width && laser.y > 0 && laser.y < canvas.height;
      });

      if (Math.random() < 0.02) {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        switch (side) {
          case 0: x = 0; y = Math.random() * canvas.height; break;
          case 1: x = canvas.width; y = Math.random() * canvas.height; break;
          case 2: x = Math.random() * canvas.width; y = 0; break;
          default: x = Math.random() * canvas.width; y = canvas.height;
        }
        gameRef.current.asteroids.push({
          x,
          y,
          rotation: Math.random() * Math.PI * 2,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 2 + 1
        });
      }

      if (gameRef.current.score > 0 && gameRef.current.score % 1000 === 0) {
        asteroidInterval = Math.max(200, asteroidInterval - 100);
      }

      gameRef.current.asteroids = gameRef.current.asteroids.filter(asteroid => {
        asteroid.x += Math.cos(asteroid.rotation) * asteroid.speed;
        asteroid.y += Math.sin(asteroid.rotation) * asteroid.speed;

        ctx.save();
        ctx.translate(asteroid.x, asteroid.y);
        ctx.rotate(asteroid.rotation);

        ctx.beginPath();
        ctx.arc(0, 0, asteroid.size, 0, Math.PI * 2);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5;
          const craterX = Math.cos(angle) * (asteroid.size * 0.5);
          const craterY = Math.sin(angle) * (asteroid.size * 0.5);
          const craterSize = asteroid.size * 0.2;

          ctx.beginPath();
          ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fill();
        }

        ctx.restore();

        const shipX = gameRef.current.ship.x;
        const shipY = gameRef.current.ship.y;
        const distance = Math.sqrt(
          Math.pow(asteroid.x - shipX, 2) + Math.pow(asteroid.y - shipY, 2)
        );

        if (distance < asteroid.size + 10) {
          gameRef.current.gameOver = true;
        }

        return (
          asteroid.x > -asteroid.size &&
          asteroid.x < canvas.width + asteroid.size &&
          asteroid.y > -asteroid.size &&
          asteroid.y < canvas.height + asteroid.size
        );
      });

      gameRef.current.lasers.forEach(laser => {
        gameRef.current.asteroids.forEach((asteroid, asteroidIndex) => {
          const distance = Math.sqrt(
            Math.pow(laser.x - asteroid.x, 2) + Math.pow(laser.y - asteroid.y, 2)
          );

          if (distance < asteroid.size) {
            gameRef.current.asteroids.splice(asteroidIndex, 1);
            gameRef.current.score += 100;
          }
        });
      });

      ctx.fillStyle = '#fff';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${gameRef.current.score}`, 20, 30);

      if (gameRef.current.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText(`Final Score: ${gameRef.current.score}`, canvas.width / 2, canvas.height / 2 + 40);
        return;
      }

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <Layout>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full bg-black"
      />
    </Layout>
  );
};

export default AsteroidDefender;
