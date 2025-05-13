
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Quiz from "../components/quiz/Quiz";
import { articles } from "../data/articles";
import { Article } from "../types";
import { ArrowLeft, Calendar, User, Link2 } from "lucide-react";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const foundArticle = articles.find((a) => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Get 3 random related articles excluding the current one
      const related = articles
        .filter((a) => a.id !== id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      setRelatedArticles(related);
    }
  }, [id]);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Article not found</h2>
            <Link to="/articles" className="space-button-secondary">
              Back to Articles
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative">
        <div
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-space-900/70 via-space-900/40 to-space-900"></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/articles"
            className="inline-flex items-center text-sm text-cosmos-purple hover:text-cosmos-blue transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-8 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Link2 className="h-4 w-4 mr-2" />
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cosmos-purple transition-colors"
              >
                {article.source}
              </a>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none mb-12 prose-headings:text-white prose-headings:font-space prose-a:text-cosmos-purple prose-a:no-underline hover:prose-a:text-cosmos-blue prose-p:text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Source Attribution */}
          <div className="mb-12 p-4 border border-space-700/50 rounded-lg bg-space-800/50">
            <h3 className="text-sm font-medium text-white mb-1">Source</h3>
            <p className="text-sm text-gray-400">
              This article is adapted from{" "}
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cosmos-purple hover:text-cosmos-blue transition-colors"
              >
                {article.source}
              </a>
              . Written by {article.author}.
            </p>
          </div>

          {/* Quiz Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Test Your Knowledge
            </h2>
            <Quiz quiz={article.quiz} />
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/articles/${relatedArticle.id}`}
                    className="block group"
                  >
                    <div className="space-card h-full">
                      <div className="relative h-40 overflow-hidden rounded-t-lg">
                        <img
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-800 to-transparent opacity-70"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold text-white group-hover:text-cosmos-purple transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
