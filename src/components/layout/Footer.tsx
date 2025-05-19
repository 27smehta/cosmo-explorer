import { Link } from "react-router-dom";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue/90 text-gray-300 border-t border-gray-800 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Cosmo<span className="text-blue-400">Explorer</span>
          </h2>
          <p className="text-sm mb-4">
            Our mission: Ignite curiosity and make space accessible to everyone. Discover, play, and learn with us as we journey through the universe together.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500 transition">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-500 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Get the latest cosmic news, quizzes, and games. No spam!
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 flex flex-col sm:flex-row gap-8">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Explore</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-blue-400 transition">Discover</Link>
              </li>
              <li>
                <Link to="/missions" className="hover:text-blue-400 transition">Missions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition">FAQ</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-blue-400 transition">Support</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} CosmoExplorer. Crafted with curiosity. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;