import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../components/layout/Layout";
import { Book } from "lucide-react";

interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

const FilteredArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const fetchArticles = async (url: string = 'https://api.spaceflightnewsapi.net/v4/articles/?format=json') => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(url);
      setArticles(response.data.results);
      setNextPage(response.data.next);
      setPreviousPage(response.data.previous);
      setError(null);
    } catch (err) {
      setError('Failed to fetch articles');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Layout>
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-nebula opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-space-700/50 rounded-full mb-6">
              <Book className="h-6 w-6 text-cosmos-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Latest Space News
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Stay updated with the latest developments in space exploration, technology, and discoveries from around the world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmos-purple mx-auto"></div>
              <p className="mt-4 text-gray-300">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-white mb-4">
                Error loading articles
              </h3>
              <p className="text-gray-400">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div key={article.id} className="bg-space-700/50 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                    {article.image_url && (
                      <div className="relative h-48">
                        <img 
                          src={article.image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-900 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-cosmos-purple mb-2">{article.news_site}</p>
                      <p className="text-sm text-gray-400 mb-4">
                        {new Date(article.published_at).toLocaleDateString()}
                      </p>
                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-cosmos-purple to-cosmos-blue hover:from-space-700 hover:to-space-800 text-white px-6 py-2 rounded-full transition-all"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-12">
                {previousPage && (
                  <button 
                    onClick={() => fetchArticles(previousPage)}
                    className="bg-space-700/50 hover:bg-space-600 text-white px-6 py-2 rounded-full transition-all"
                  >
                    Previous
                  </button>
                )}
                {nextPage && (
                  <button 
                    onClick={() => fetchArticles(nextPage)}
                    className="bg-space-700/50 hover:bg-space-600 text-white px-6 py-2 rounded-full transition-all"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FilteredArticles; 





