import Layout from "../components/layout/Layout";
import GameCard from "../components/games/GameCard";
import { games } from "../data/games";
import { Gamepad } from "lucide-react";

const Games = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <Gamepad className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Space Games
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Challenge yourself with our collection of interactive space-themed games and quizzes.
              Learn about space while having fun!
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-nebula opacity-10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Global Leaderboard
              </h2>
              <p className="text-gray-300">
                Compete with space enthusiasts from around the world. Can you reach the top?
              </p>
            </div>
            
            <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-400 mb-4 px-4">
                  <span>Rank</span>
                  <span>Player</span>
                  <span>Game</span>
                  <span>Score</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { rank: 1, player: "mananpro55", game: "Asteroid Defender", score: 35000 },
                    { rank: 2, player: "SpaceX_Fan", game: "Asteroid Defender", score: 32400 },
                    { rank: 3, player: "CosmicVoyager", game: "Rocket Launch", score: 29850 },
                    { rank: 4, player: "StarGazer42", game: "Space Trivia", score: 27600 },
                    { rank: 5, player: "GalacticPioneer", game: "Asteroid Defender", score: 25730 }
                  ].map((entry, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-4 rounded-lg ${
                        entry.rank === 1 
                          ? "bg-yellow-900/20 border border-yellow-500/30" 
                          : entry.rank === 2 
                          ? "bg-gray-700/20 border border-gray-400/30"
                          : entry.rank === 3
                          ? "bg-amber-800/20 border border-amber-600/30"
                          : "bg-space-700/50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1 
                          ? "bg-yellow-500/20 text-yellow-300" 
                          : entry.rank === 2 
                          ? "bg-gray-500/20 text-gray-300"
                          : entry.rank === 3
                          ? "bg-amber-600/20 text-amber-400"
                          : "bg-space-600/20 text-gray-400"
                      }`}>
                        {entry.rank}
                      </div>
                      <span className="text-white font-medium">{entry.player}</span>
                      <span className="text-gray-300">{entry.game}</span>
                      <span className="text-cosmos-purple font-mono font-medium">{entry.score.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Games;