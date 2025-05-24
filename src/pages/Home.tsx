import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ArticleCard from "../components/articles/ArticleCard";
import GameCard from "../components/games/GameCard";
import { articles } from "../data/articles";
import { games } from "../data/games";
import { Rocket, Book, Gamepad, Star } from "lucide-react";
import NewsletterSubscription from '../components/NewsletterSubscription';

const Home = () => {
  const [featuredArticles, setFeaturedArticles] = useState(articles.slice(0, 3));
  const [featuredGames, setFeaturedGames] = useState(games.slice(0, 2));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Explore the <span className="text-cosmos-purple">Cosmos</span> Like Never Before
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Your gateway to the latest discoveries, interactive quizzes, and
              space-themed games. Embark on a journey through the universe.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
              <Link to="/articles" className="space-button inline-flex items-center justify-center">
                <Book className="mr-2 h-5 w-5" />
                Explore Articles
              </Link>
              <Link to="/games" className="space-button-secondary inline-flex items-center justify-center">
                <Gamepad className="mr-2 h-5 w-5" />
                Play Games
              </Link>
            </div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="hidden md:block absolute top-1/3 left-20 w-20 h-20 opacity-30 animate-float">
          <Rocket className="w-full h-full text-cosmos-purple" />
        </div>
        <div className="hidden md:block absolute bottom-1/4 right-20 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: "2s" }}>
          <Star className="w-full h-full text-cosmos-blue" />
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 relative">
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
      <section className="py-16 relative">
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
      <section className="py-16">
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

      <div className="mt-12">
        <NewsletterSubscription />
      </div>
    </Layout>
  );
};

export default Home;


6