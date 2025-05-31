import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ArticleCard from "../components/articles/ArticleCard";
import GameCard from "../components/games/GameCard";
import { articles } from "../data/articles";
import { games } from "../data/games";
import { Rocket, Book, Gamepad, Star } from "lucide-react";
import NewsletterSubscription from '../components/NewsletterSubscription';
import LandingPage3D from "../components/three-d/LandingPage3D";

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState(articles.slice(0, 3));
  const [featuredGames, setFeaturedGames] = useState(games.slice(0, 2));

  return (
    <Layout>
      {/* 3D Hero Section */}
      <LandingPage3D />

      {/* Featured Articles Section */}
      <section className="py-16 relative bg-space-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Latest Articles</h2>
            <Link to="/articles" className="text-cosmos-purple hover:text-cosmos-blue transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16 relative bg-space-900">
        <div className="absolute inset-0 bg-nebula opacity-10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Space Games</h2>
            <Link to="/games" className="text-cosmos-purple hover:text-cosmos-blue transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-space-900">
        <div className="container mx-auto px-6">
          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-nebula opacity-20"></div>
            <div className="p-8 md:p-12 relative">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Test Your Space Knowledge?
                </h2>
                <p className="text-gray-300 mb-8">
                  Challenge yourself with our collection of space quizzes and games. Learn while having fun!
                </p>
                <Link
                  to="/games/space-trivia"
                  className="space-button inline-flex items-center justify-center"
                >
                  <Gamepad className="mr-2 h-5 w-5" />
                  Start Space Trivia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 bg-space-900">
        <NewsletterSubscription />
      </div>
    </Layout>
  );
};

export default Home;


