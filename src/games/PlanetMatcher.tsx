
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Plane, Star } from "lucide-react";

// List of planet pairs (for matching). (Images via unsplash or emoji as fallback)
const planetData = [
  { name: "Earth", img: "🌍" },
  { name: "Mars", img: "🌕" },
  { name: "Jupiter", img: "🪐" },
  { name: "Venus", img: "🌑" },
  { name: "Neptune", img: "🔵" },
  { name: "Mercury", img: "🟤" },
];

const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

const PlanetMatcher = () => {
  // Create duplicate pairs, shuffle
  const [cards, setCards] = useState<
    { id: number; name: string; img: string; flipped: boolean; matched: boolean }[]
  >([]);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // New game: duplicate and shuffle
    const fullList = shuffle(
      planetData.concat(planetData).map((p, idx) => ({
        ...p,
        id: idx,
        flipped: false,
        matched: false,
      }))
    );
    setCards(fullList);
    setMoves(0);
    setMatchedCount(0);
    setFirstCard(null);
    setSecondCard(null);
    setWaiting(false);
    setGameOver(false);
  }, []);

  useEffect(() => {
    // Check game over
    if (matchedCount === planetData.length) {
      setGameOver(true);
    }
  }, [matchedCount]);

  const handleFlip = (idx: number) => {
    if (waiting || cards[idx].flipped || cards[idx].matched) return;

    let flippedCards = [...cards];
    flippedCards[idx].flipped = true;

    if (firstCard === null) {
      setFirstCard(idx);
      setCards(flippedCards);
    } else if (secondCard === null && idx !== firstCard) {
      setSecondCard(idx);
      setCards(flippedCards);
      setMoves(moves + 1);

      setWaiting(true);
      setTimeout(() => {
        const firstIdx = firstCard;
        const secondIdx = idx;

        if (
          flippedCards[firstIdx].name === flippedCards[secondIdx].name
        ) {
          // Match!
          flippedCards[firstIdx].matched = true;
          flippedCards[secondIdx].matched = true;
          setMatchedCount(matchedCount + 1);
        } else {
          // Unflip
          flippedCards[firstIdx].flipped = false;
          flippedCards[secondIdx].flipped = false;
        }
        setCards([...flippedCards]);
        setFirstCard(null);
        setSecondCard(null);
        setWaiting(false);
      }, 900);
    }
  };

  const handleRestart = () => {
    // New shuffle and reset
    const fullList = shuffle(
      planetData.concat(planetData).map((p, idx) => ({
        ...p,
        id: idx,
        flipped: false,
        matched: false,
      }))
    );
    setCards(fullList);
    setMoves(0);
    setMatchedCount(0);
    setFirstCard(null);
    setSecondCard(null);
    setWaiting(false);
    setGameOver(false);
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 flex justify-center items-center gap-2">
              <Plane className="w-8 h-8 text-cosmos-purple" /> Planet Matcher
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Flip the cosmic cards and test your memory! Match all planets and moons as quickly as you can. Fewer moves means a higher score!
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-4 gap-4 bg-space-800/80 p-8 rounded-lg w-fit">
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  className={`w-24 h-28 flex items-center justify-center rounded-md cursor-pointer relative overflow-hidden 
                    border-2 transition-colors shadow-lg 
                    ${
                      card.matched
                        ? "bg-green-400/20 border-green-500/70"
                        : card.flipped
                        ? "bg-cosmos-purple/30 border-cosmos-purple"
                        : "bg-space-700 border-space-600 hover:border-cosmos-purple"
                    }
                  `}
                  onClick={() => handleFlip(idx)}
                  aria-label={card.flipped || card.matched ? card.name : "Card"}
                >
                  {(card.flipped || card.matched) ? (
                    <span className="text-5xl animate-scale-in" aria-label={card.name}>{card.img}</span>
                  ) : (
                    <Star className="h-7 w-7 text-cosmos-purple/40" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-white mb-1 font-mono">Moves: {moves}</p>
              {gameOver ? (
                <div className="text-lg font-bold text-green-400 mb-2">🎉 All pairs matched!</div>
              ) : null}
              <button
                onClick={handleRestart}
                className="space-button mt-2"
              >
                {gameOver ? "Play Again" : "Restart"}
              </button>
            </div>
          </div>
          <div className="mt-8 bg-space-800/50 backdrop-blur-sm border border-space-700/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
            <ul className="text-gray-300 space-y-2">
              <li>Click any two cards to reveal what's beneath.</li>
              <li>If they match, they'll stay open! If not, they'll flip back.</li>
              <li>Match all pairs using as few moves as possible.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlanetMatcher;
