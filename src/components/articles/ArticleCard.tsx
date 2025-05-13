
import { Link } from "react-router-dom";
import { Article } from "../../types";
import { formatDistanceToNow } from "date-fns";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const publishDate = new Date(article.date);

  return (
    <Link to={`/articles/${article.id}`} className="block group">
      <div className="space-card group-hover:transform group-hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-800 to-transparent opacity-70"></div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center text-xs text-gray-400 mb-2">
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>{article.source}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cosmos-purple transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {article.summary}
          </p>
          <div className="mt-auto pt-4 border-t border-space-700/30 flex justify-between items-center">
            <span className="text-xs text-gray-400">By {article.author}</span>
            <span className="text-cosmos-purple text-sm font-medium">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
