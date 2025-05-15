import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface Planet {
  id: number;
  name: string;
  image: string;
  description: string;
  isMatched: boolean;
}

const planets: Planet[] = [
  {
    id: 1,
    name: 'Mercury',
    image: '/images/planets/mercury.png',
    description: 'The smallest and innermost planet in the Solar System.',
    isMatched: false
  },
  {
    id: 2,
    name: 'Venus',
    image: '/images/planets/venus.png',
    description: 'The second planet from the Sun and Earth\'s closest planetary neighbor.',
    isMatched: false
  },
  {
    id: 3,
    name: 'Earth',
    image: '/images/planets/earth.png',
    description: 'The third planet from the Sun and the only astronomical object known to harbor life.',
    isMatched: false
  },
  {
    id: 4,
    name: 'Mars',
    image: '/images/planets/mars.png',
    description: 'The fourth planet from the Sun and the second-smallest planet in the Solar System.',
    isMatched: false
  },
  {
    id: 5,
    name: 'Jupiter',
    image: '/images/planets/jupiter.png',
    description: 'The fifth planet from the Sun and the largest in the Solar System.',
    isMatched: false
  },
  {
    id: 6,
    name: 'Saturn',
    image: '/images/planets/saturn.png',
    description: 'The sixth planet from the Sun and the second-largest in the Solar System.',
    isMatched: false
  }
];

const PlanetMatcher = () => {
  const [gamePlanets, setGamePlanets] = useState<Planet[]>([]);
  const [selectedPlanets, setSelectedPlanets] = useState<Planet[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledPlanets = [...planets, ...planets]
      .sort(() => Math.random() - 0.5)
      .map((planet, index) => ({ ...planet, id: index + 1 }));
    setGamePlanets(shuffledPlanets);
    setSelectedPlanets([]);
    setScore(0);
    setGameOver(false);
  };

  const handlePlanetClick = (planet: Planet) => {
    if (selectedPlanets.length === 2 || planet.isMatched) return;

    const newSelectedPlanets = [...selectedPlanets, planet];
    setSelectedPlanets(newSelectedPlanets);

    if (newSelectedPlanets.length === 2) {
      const [first, second] = newSelectedPlanets;
      if (first.name === second.name) {
        setGamePlanets(prevPlanets =>
          prevPlanets.map(p =>
            p.name === first.name ? { ...p, isMatched: true } : p
          )
        );
        setScore(prev => prev + 10);
        setSelectedPlanets([]);

        const allMatched = gamePlanets.every(p => p.isMatched);
        if (allMatched) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setSelectedPlanets([]);
        }, 1000);
      }
    }
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
              Planet Matcher
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Test your memory by matching pairs of planets. Find all the matching pairs to win!
            </p>
          </div>

          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-white">
                Score: <span className="text-cosmos-purple">{score}</span>
              </div>
              <button
                onClick={startNewGame}
                className="space-button"
              >
                New Game
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gamePlanets.map(planet => (
                <div
                  key={planet.id}
                  onClick={() => handlePlanetClick(planet)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedPlanets.includes(planet) || planet.isMatched
                      ? 'ring-2 ring-cosmos-purple'
                      : 'bg-space-700/50'
                  }`}
                >
                  {selectedPlanets.includes(planet) || planet.isMatched ? (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img
                        src={planet.image}
                        alt={planet.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-space-600/50 animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {gameOver && (
              <div className="fixed inset-0 flex items-center justify-center bg-space-900/80 backdrop-blur-sm">
                <div className="text-center p-8 bg-space-800 border border-space-700 rounded-lg max-w-md">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Congratulations!
                  </h2>
                  <p className="text-xl text-cosmos-purple mb-6">
                    You matched all the planets!
                  </p>
                  <p className="text-white mb-6">
                    Final Score: {score}
                  </p>
                  <button
                    onClick={startNewGame}
                    className="space-button"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlanetMatcher;
