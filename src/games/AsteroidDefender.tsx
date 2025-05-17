import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

window.onkeydown = function(e) {
  return e.keyCode !== 32 && e.key !== " ";
}

const AsteroidDefender = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<any>(null);

  useEffect(() => {
    if (gameStarted && canvasRef.current && !gameOver) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      let ship = {
        x: canvas.width / 2,
        y: canvas.height - 50,
        width: 40,
        height: 40,
        speed: 8
      };
      
      let asteroids: any[] = [];
      let lasers: any[] = [];
      let keys: {[key: string]: boolean} = {};
      let lastAsteroidTime = 0;
      let asteroidInterval = 1000;
      let currentScore = 0;
      let invulnerable = false;
      let invulnerableTime = 0;
      
      window.addEventListener("keydown", (e) => keys[e.key] = true);
      window.addEventListener("keyup", (e) => keys[e.key] = false);
      
      let gameLoop = () => {
        if (gameOver) return;
        
        ctx.fillStyle = "rgba(26, 31, 44, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawStars(ctx, canvas);
        updateShip();
        drawShip();
        updateLasers();
        drawLasers();
        
        if (Date.now() - lastAsteroidTime > asteroidInterval) {
          createAsteroid();
          lastAsteroidTime = Date.now();
          if (asteroidInterval > 300) {
            asteroidInterval *= 0.99;
          }
        }
        
        updateAsteroids();
        drawAsteroids();
        checkCollisions();
        drawScore();
        drawLives();
        
        if (invulnerable && Date.now() - invulnerableTime > 2000) {
          invulnerable = false;
        }
        
        gameRef.current = requestAnimationFrame(gameLoop);
      };
      
      gameRef.current = requestAnimationFrame(gameLoop);
      
      function drawStars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        const time = Date.now() * 0.001;
        ctx.fillStyle = "white";
        for (let i = 0; i < 100; i++) {
          const x = Math.sin(i * 512.5 + time) * canvas.width / 2 + canvas.width / 2;
          const y = Math.cos(i * 763.5 + time) * canvas.height / 2 + canvas.height / 2;
          const size = (Math.sin(i * 25.2 + time) + 1) * 1.5;
          const opacity = (Math.sin(i * 0.5 + time) + 1) * 0.5;
          
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      
      function updateShip() {
        if (keys["ArrowLeft"] && ship.x > 0) {
          ship.x -= ship.speed;
        }
        if (keys["ArrowRight"] && ship.x < canvas.width - ship.width) {
          ship.x += ship.speed;
        }
        if (keys[" "] || keys["ArrowUp"]) {
          fireLaser();
          keys[" "] = false;
        }
      }
      
      function drawShip() {
        ctx.save();
        ctx.translate(ship.x + ship.width / 2, ship.y + ship.height / 2);
        
        if (invulnerable) {
          ctx.globalAlpha = Math.sin(Date.now() * 0.01) * 0.5 + 0.5;
        }
        
        ctx.fillStyle = "#8B5CF6";
        ctx.beginPath();
        ctx.moveTo(0, -ship.height / 2);
        ctx.lineTo(ship.width / 2, ship.height / 2);
        ctx.lineTo(-ship.width / 2, ship.height / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = "#0EA5E9";
        ctx.beginPath();
        ctx.moveTo(-ship.width / 4, ship.height / 2);
        ctx.lineTo(ship.width / 4, ship.height / 2);
        ctx.lineTo(0, ship.height / 2 + 10 + Math.random() * 5);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
      
      function fireLaser() {
        if (lasers.length < 5) {
          lasers.push({
            x: ship.x + ship.width / 2 - 2,
            y: ship.y,
            width: 4,
            height: 15,
            speed: 10
          });
        }
      }
      
      function updateLasers() {
        for (let i = lasers.length - 1; i >= 0; i--) {
          lasers[i].y -= lasers[i].speed;
          if (lasers[i].y < 0) {
            lasers.splice(i, 1);
          }
        }
      }
      
      function drawLasers() {
        ctx.fillStyle = "#D946EF";
        for (let laser of lasers) {
          ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
          
          ctx.save();
          ctx.shadowColor = "#D946EF";
          ctx.shadowBlur = 10;
          ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
          ctx.restore();
        }
      }
      
      function createAsteroid() {
        const size = 20 + Math.random() * 30;
        asteroids.push({
          x: Math.random() * (canvas.width - size),
          y: -size,
          width: size,
          height: size,
          speed: 1 + Math.random() * 3,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.1
        });
      }
      
      function updateAsteroids() {
        for (let i = asteroids.length - 1; i >= 0; i--) {
          asteroids[i].y += asteroids[i].speed;
          asteroids[i].rotation += asteroids[i].rotationSpeed;
          
          if (asteroids[i].y > canvas.height) {
            asteroids.splice(i, 1);
          }
        }
      }
      
      function drawAsteroids() {
        for (let asteroid of asteroids) {
          ctx.save();
          ctx.translate(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
          ctx.rotate(asteroid.rotation);
          
          ctx.fillStyle = "#6E59A5";
          ctx.beginPath();
          ctx.moveTo(-asteroid.width / 2, 0);
          for (let i = 0; i < 8; i++) {
            const angle = i * Math.PI / 4;
            const radius = asteroid.width / 2 * (0.8 + Math.sin(i * 5) * 0.2);
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
          ctx.closePath();
          ctx.fill();
          
          ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
          for (let i = 0; i < 3; i++) {
            const craterX = (Math.random() - 0.5) * asteroid.width * 0.5;
            const craterY = (Math.random() - 0.5) * asteroid.height * 0.5;
            const craterSize = asteroid.width * 0.1 + Math.random() * asteroid.width * 0.1;
            ctx.beginPath();
            ctx.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        }
      }
      
      function checkCollisions() {
        for (let i = lasers.length - 1; i >= 0; i--) {
          for (let j = asteroids.length - 1; j >= 0; j--) {
            if (
              lasers[i].x < asteroids[j].x + asteroids[j].width &&
              lasers[i].x + lasers[i].width > asteroids[j].x &&
              lasers[i].y < asteroids[j].y + asteroids[j].height &&
              lasers[i].y + lasers[i].height > asteroids[j].y
            ) {
              lasers.splice(i, 1);
              asteroids.splice(j, 1);
              currentScore += 100;
              setScore(currentScore);
              break;
            }
          }
        }
        
        if (!invulnerable) {
          for (let asteroid of asteroids) {
            if (
              ship.x < asteroid.x + asteroid.width &&
              ship.x + ship.width > asteroid.x &&
              ship.y < asteroid.y + asteroid.height &&
              ship.y + ship.height > asteroid.y
            ) {
              const newLives = lives - 1;
              setLives(newLives);
              if (newLives <= 0) {
                setGameOver(true);
                cancelAnimationFrame(gameRef.current);
              } else {
                invulnerable = true;
                invulnerableTime = Date.now();
              }
              break;
            }
          }
        }
      }
      
      function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "24px 'Space Grotesk', sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${currentScore}`, 20, 40);
      }

      function drawLives() {
        ctx.fillStyle = "white";
        ctx.font = "24px 'Space Grotesk', sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(`Lives: ${lives}`, canvas.width - 20, 40);
      }
      
      return () => {
        window.removeEventListener("keydown", (e) => keys[e.key] = true);
        window.removeEventListener("keyup", (e) => keys[e.key] = false);
        cancelAnimationFrame(gameRef.current);
      };
    }
  }, [gameStarted, gameOver, lives]);

  const handleRestart = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
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
              Asteroid Defender
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Protect Earth from incoming asteroids in this fast-paced arcade game. Use the arrow keys to move and spacebar to shoot.
            </p>
          </div>

          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden">
            {!gameStarted ? (
              <div className="p-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Ready to defend Earth?
                </h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                  Use the left and right arrow keys to move your ship and spacebar to fire lasers at incoming asteroids. How long can you protect our planet?
                </p>
                <button
                  onClick={() => setGameStarted(true)}
                  className="space-button inline-flex items-center justify-center"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-[600px] object-contain"
                />
                
                {gameOver && (
                  <div className="absolute inset-0 flex items-center justify-center bg-space-900/80 backdrop-blur-sm">
                    <div className="text-center p-8 bg-space-800 border border-space-700 rounded-lg max-w-md">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Game Over
                      </h2>
                      <p className="text-xl text-cosmos-purple mb-6">
                        Final Score: {score}
                      </p>
                      <button
                        onClick={handleRestart}
                        className="space-button inline-flex items-center justify-center"
                      >
                        Play Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 bg-space-800/50 backdrop-blur-sm border border-space-700/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <span className="inline-block w-8 h-8 bg-space-700 rounded flex items-center justify-center mr-3">←</span>
                <span>Move left</span>
              </li>
              <li className="flex items-center">
                <span className="inline-block w-8 h-8 bg-space-700 rounded flex items-center justify-center mr-3">→</span>
                <span>Move right</span>
              </li>
              <li className="flex items-center">
                <span className="inline-block bg-space-700 rounded px-3 py-1 mr-3">Space</span>
                <span>Fire laser</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AsteroidDefender;
