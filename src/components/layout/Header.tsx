import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star, Rocket, Book, Gamepad, Scale, Sparkles, Calendar, Satellite } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/", icon: <Star className="h-4 w-4" /> },
    { name: "Articles", path: "/articles", icon: <Book className="h-4 w-4" /> },
    { name: "Games", path: "/games", icon: <Gamepad className="h-4 w-4" /> },
    { name: "Weight Converter", path: "/weight-converter", icon: <Scale className="h-4 w-4" /> },
    { name: "Zodiac Sign", path: "/zodiac-sign", icon: <Sparkles className="h-4 w-4" /> },
    { name: "Astronomical Events", path: "/astronomical-events", icon: <Calendar className="h-4 w-4" /> },
    { name: "ISS Tracker", path: "/iss-tracker", icon: <Satellite className="h-4 w-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-space-800/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-space font-bold"
          >
            <Rocket className="h-8 w-8 text-cosmos-purple animate-pulse-glow" />
            <span className="text-white">COSMO<span className="text-cosmos-purple">EXPLORER</span></span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-cosmos-purple"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 py-3 px-4 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-space-700 text-cosmos-purple"
                    : "text-gray-300 hover:bg-space-700/50 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
