import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ReflexTestGame from "../components/games/ReflexTestGame";
import { ArrowLeft } from "lucide-react";

const ReflexTest = () => {
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
              Astro Reflex Challenge
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Test your reaction time in this astronaut training exercise. Click when the screen turns green and see how fast your reflexes are. Perfect for aspiring astronauts!
            </p>
          </div>

          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden">
            <ReflexTestGame />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReflexTest; 