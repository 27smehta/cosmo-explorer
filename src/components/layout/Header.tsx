import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Rocket, BookOpen, Gamepad2, Scale, Sparkles, Calendar, Map, Home, GraduationCap, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
    { path: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { path: "/games", label: "Games", icon: <Gamepad2 className="h-4 w-4" /> },
    { path: "/weight-converter", label: "Weight Converter", icon: <Scale className="h-4 w-4" /> },
    { path: "/zodiac-sign", label: "Zodiac Sign", icon: <Sparkles className="h-4 w-4" /> },
    { path: "/astronomical-events", label: "Astronomical Events", icon: <Calendar className="h-4 w-4" /> },
    { path: "/iss-tracker", label: "ISS Tracker", icon: <Rocket className="h-4 w-4" /> },
    { path: "/sky-map", label: "Sky Map", icon: <Map className="h-4 w-4" /> },
    { path: "/career-explorer", label: "Career Explorer", icon: <GraduationCap className="h-4 w-4" /> }
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
            className="flex items-center space-x-2 text-xl font-space font-bold mr-8"
          >
            <Rocket className="h-8 w-8 text-cosmos-purple animate-pulse-glow" />
            <span className="text-white">COSMO<span className="text-cosmos-purple">EXPLORER</span></span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-2 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-cosmos-purple"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-2 py-2 text-sm font-medium transition-colors ${
                isActive("/articles")
                  ? "text-cosmos-purple"
                  : "text-gray-300 hover:text-white"
              }`}>
                <BookOpen className="h-4 w-4" />
                <span>Articles</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-space-800 border-space-700">
                <DropdownMenuItem asChild>
                  <Link to="/articles" className="text-gray-300 hover:text-white hover:bg-space-700">
                    All Articles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/filtered-articles" className="text-gray-300 hover:text-white hover:bg-space-700">
                    Latest Space News
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <Link
              to="/articles"
              className={`flex items-center space-x-3 py-3 px-4 rounded-md transition-colors ${
                isActive("/articles")
                  ? "bg-space-700 text-cosmos-purple"
                  : "text-gray-300 hover:bg-space-700/50 hover:text-white"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>All Articles</span>
            </Link>
            <Link
              to="/filtered-articles"
              className={`flex items-center space-x-3 py-3 px-4 rounded-md transition-colors ${
                isActive("/filtered-articles")
                  ? "bg-space-700 text-cosmos-purple"
                  : "text-gray-300 hover:bg-space-700/50 hover:text-white"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Latest Space News</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center space-x-3 py-3 px-4 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-space-700 text-cosmos-purple"
                    : "text-gray-300 hover:bg-space-700/50 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
