
import { useState } from "react";
import Layout from "../components/layout/Layout";
import ArticleCard from "../components/articles/ArticleCard";
import { articles } from "../data/articles";
import { Book } from "lucide-react";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <Book className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Latest Space Discoveries
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Explore the cutting edge of space exploration with our curated collection of articles on the latest breakthroughs and missions.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full py-3 px-6 pr-12 bg-space-700/50 border border-space-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmos-purple/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filteredArticles.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {searchQuery
                    ? `Search Results (${filteredArticles.length})`
                    : "All Articles"}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-white mb-4">
                No articles found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search query or browse all articles.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 space-button-secondary"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
