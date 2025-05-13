
import { Link } from "react-router-dom";
import { Game } from "../../types";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link to={game.route} className="block group">
      <div className="space-card group-hover:transform group-hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-800 to-transparent opacity-70"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cosmos-purple transition-colors">
            {game.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 flex-grow">
            {game.description}
          </p>
          <button className="space-button w-full mt-auto">
            Play Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
