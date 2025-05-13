
import { Link } from "react-router-dom";
import { Rocket, Star, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-space-800/50 border-t border-space-700/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-cosmos-purple" />
              <span className="text-lg font-space font-bold text-white">
                COSMO<span className="text-cosmos-purple">EXPLORER</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Explore the cosmos with the latest discoveries, interactive quizzes, 
              and space-themed games.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-cosmos-purple transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-cosmos-purple transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/articles"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/games"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  Games
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Games
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/games/asteroid-defender"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  Asteroid Defender
                </Link>
              </li>
              <li>
                <Link
                  to="/games/rocket-launch"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  Rocket Launch Simulator
                </Link>
              </li>
              <li>
                <Link
                  to="/games/space-trivia"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  Space Trivia Challenge
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              About
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  NASA
                </a>
              </li>
              <li>
                <a
                  href="https://esa.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  ESA
                </a>
              </li>
              <li>
                <a
                  href="https://spacex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cosmos-purple transition-colors"
                >
                  SpaceX
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-space-700/30 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CosmoExplorer. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              to="/privacy"
              className="text-sm text-gray-400 hover:text-cosmos-purple transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-cosmos-purple transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
