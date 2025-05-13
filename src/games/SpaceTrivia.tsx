
import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Clock, RotateCcw } from "lucide-react";
import { Question } from "../types";
import { articles } from "../data/articles";

const SpaceTrivia = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [highScores, setHighScores] = useState<{name: string, score: number}[]>([
    { name: "CosmicVoyager", score: 950 },
    { name: "StarGazer42", score: 800 },
    { name: "NebulaNomad", score: 700 },
    { name: "AstroExplorer", score: 650 },
    { name: "GalaxyWanderer", score: 600 }
  ]);

  // Get all questions from articles
  useEffect(() => {
    if (gameStarted && questions.length === 0) {
      const allQuestions: Question[] = [];
      
      articles.forEach(article => {
        if (article.quiz && article.quiz.questions) {
          article.quiz.questions.forEach(question => {
            allQuestions.push(question);
          });
        }
      });
      
      // Shuffle and select 10 random questions
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 10));
    }
  }, [gameStarted, questions.length]);

  // Timer countdown
  useEffect(() => {
    if (gameStarted && !gameOver && !answered && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, answered, currentQuestionIndex, questions.length]);

  const handleTimeout = () => {
    setAnswered(true);
    
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  const handleOptionSelect = (optionId: string) => {
    if (answered) return;
    
    setSelectedOptionId(optionId);
    setAnswered(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    
    if (optionId === currentQuestion.correctOptionId) {
      // Calculate score based on time left
      const questionScore = 50 + (timeLeft * 10);
      setScore(prevScore => prevScore + questionScore);
    }
    
    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setAnswered(false);
      setTimeLeft(15);
    } else {
      // Game over
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setAnswered(false);
    setTimeLeft(15);
    setQuestions([]);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/games"
          className="inline-flex items-center text-sm text-cosmos-purple hover:text-cosmos-blue transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Space Trivia Challenge
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Test your knowledge of space exploration, astronomy, and cosmic phenomena in this timed quiz game.
            </p>
          </div>

          <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg overflow-hidden">
            {!gameStarted ? (
              <div className="p-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Ready to test your cosmic knowledge?
                </h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                  Answer questions about space exploration, astronomy, and cosmic phenomena. Each correct answer earns you points, with bonus points for answering quickly!
                </p>
                <button
                  onClick={() => setGameStarted(true)}
                  className="space-button inline-flex items-center justify-center"
                >
                  Start Quiz
                </button>
              </div>
            ) : gameOver ? (
              <div className="p-12 text-center">
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Quiz Complete!
                </h2>
                <p className="text-xl text-cosmos-purple mb-8">
                  Your Final Score: {score}
                </p>
                
                <div className="mb-8 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">Leaderboard</h3>
                  <div className="bg-space-700/50 rounded-lg p-4">
                    {[...highScores, { name: "You", score }]
                      .sort((a, b) => b.score - a.score)
                      .slice(0, 5)
                      .map((entry, index) => (
                        <div 
                          key={index} 
                          className={`flex justify-between items-center py-2 px-4 rounded-md mb-2 ${
                            entry.name === "You" 
                              ? "bg-cosmos-purple/20 border border-cosmos-purple/30" 
                              : "bg-space-600/20"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="w-8 text-gray-400 text-right mr-4">{index + 1}.</span>
                            <span className={`font-medium ${entry.name === "You" ? "text-cosmos-purple" : "text-white"}`}>
                              {entry.name}
                            </span>
                          </div>
                          <span className="font-mono font-medium">{entry.score}</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                <button
                  onClick={handleRestart}
                  className="space-button inline-flex items-center justify-center"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Play Again
                </button>
              </div>
            ) : questions.length === 0 ? (
              <div className="p-12 text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-space-700/50 rounded w-1/3 mx-auto mb-4"></div>
                  <div className="h-4 bg-space-700/50 rounded w-1/2 mx-auto mb-2"></div>
                  <div className="h-4 bg-space-700/50 rounded w-2/3 mx-auto mb-2"></div>
                  <div className="h-4 bg-space-700/50 rounded w-1/4 mx-auto"></div>
                </div>
                <p className="text-gray-300 mt-6">Loading questions...</p>
              </div>
            ) : (
              <div className="p-8">
                {/* Progress and Timer */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-300 text-sm">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-cosmos-blue" />
                    <span className={`font-mono ${timeLeft <= 5 ? "text-red-400" : "text-cosmos-blue"}`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-space-700 rounded-full mb-8">
                  <div 
                    className="h-full bg-cosmos-purple rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
                  ></div>
                </div>
                
                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    {currentQuestion.text}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        disabled={answered}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          answered
                            ? option.id === currentQuestion.correctOptionId
                              ? "bg-green-500/20 border-green-500/50 text-white"
                              : selectedOptionId === option.id
                              ? "bg-red-500/20 border-red-500/50 text-white"
                              : "bg-space-700/50 border-space-600 text-gray-400"
                            : selectedOptionId === option.id
                            ? "bg-cosmos-purple/20 border-cosmos-purple/50 text-white"
                            : "bg-space-700/30 border-space-600 text-white hover:bg-space-700/50"
                        }`}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Explanation when answered */}
                {answered && (
                  <div className={`p-4 rounded-lg ${
                    selectedOptionId === currentQuestion.correctOptionId
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                  }`}>
                    <p className="text-white">
                      {currentQuestion.explanation || 
                        (selectedOptionId === currentQuestion.correctOptionId
                          ? "Correct! Well done."
                          : `Incorrect. The correct answer is: ${
                              currentQuestion.options.find(o => o.id === currentQuestion.correctOptionId)?.text
                            }`
                        )
                      }
                    </p>
                  </div>
                )}
                
                {/* Score */}
                <div className="mt-8 text-right">
                  <p className="text-gray-300">
                    Current Score: <span className="text-cosmos-purple font-bold">{score}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 bg-space-800/50 backdrop-blur-sm border border-space-700/30 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">How to Play</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-cosmos-purple/20 rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                <span>Read each question carefully and select the answer you believe is correct.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-cosmos-purple/20 rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                <span>Answer quickly for bonus points - you have 15 seconds per question.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-cosmos-purple/20 rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                <span>Each correct answer is worth 50 points plus up to 150 bonus points based on your speed.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpaceTrivia;
