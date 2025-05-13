import { useState, useEffect } from "react";
import { Quiz as QuizType, Question, Option } from "../../types";
import { Clock } from "lucide-react";

interface QuizProps {
  quiz: QuizType;
}

const Quiz = ({ quiz }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Time's up for this question
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showResults]);

  const handleTimeUp = () => {
    // If time runs out and no option is selected, move to the next question
    if (!selectedOptions[currentQuestion.id]) {
      if (isLastQuestion) {
        setShowResults(true);
        setIsCompleted(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(30); // Reset timer for next question
      }
    }
  };

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowResults(true);
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30); // Reset timer for next question
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setShowResults(false);
    setTimeLeft(30); // Reset timer
  };

  const calculateScore = () => {
    let correctCount = 0;

    quiz.questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctOptionId) {
        correctCount++;
      }
    });

    return {
      score: correctCount,
      total: quiz.questions.length,
      percentage: Math.round((correctCount / quiz.questions.length) * 100),
    };
  };

  const score = calculateScore();

  if (showResults) {
    return (
      <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-6 mt-8">
        <h3 className="text-2xl font-bold text-white mb-4">Quiz Results</h3>
        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{score.percentage}%</span>
            </div>
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4B5563"
                strokeWidth="2"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeDasharray={`${score.percentage}, 100`}
              />
            </svg>
          </div>
        </div>
        <p className="text-center text-lg text-white mb-6">
          You got {score.score} out of {score.total} questions correct!
        </p>
        <div className="space-y-4 mb-6">
          {quiz.questions.map((question, index) => {
            const isCorrect =
              selectedOptions[question.id] === question.correctOptionId;
            const selectedOption = question.options.find(
              (option) => option.id === selectedOptions[question.id]
            );
            const correctOption = question.options.find(
              (option) => option.id === question.correctOptionId
            );

            return (
              <div
                key={question.id}
                className={`p-4 rounded-lg ${
                  isCorrect ? "bg-green-900/20" : "bg-red-900/20"
                }`}
              >
                <p className="font-medium text-white mb-2">
                  {index + 1}. {question.text}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Your answer:{" "}
                  <span
                    className={isCorrect ? "text-green-400" : "text-red-400"}
                  >
                    {selectedOption?.text || "Not answered"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-green-400">
                    Correct answer: {correctOption?.text}
                  </p>
                )}
                {question.explanation && (
                  <p className="text-sm text-gray-400 mt-2 italic">
                    {question.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <button
          onClick={handleRestartQuiz}
          className="space-button w-full"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-space-800/80 backdrop-blur-sm border border-space-700/50 rounded-lg p-6 mt-8">
      <h3 className="text-2xl font-bold text-white mb-6">
        {quiz.title}
      </h3>
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-space-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cosmos-purple transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-4 flex items-center justify-end">
        <Clock className="h-4 w-4 mr-2 text-cosmos-blue" />
        <span className={`font-mono font-medium ${timeLeft <= 10 ? "text-red-400" : "text-cosmos-blue"}`}>
          {timeLeft}s remaining
        </span>
      </div>
      
      <div className="mb-6">
        <h4 className="text-xl font-medium text-white mb-4">
          {currentQuestion.text}
        </h4>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedOptions[currentQuestion.id] === option.id
                  ? "bg-cosmos-purple text-white"
                  : "bg-space-700/50 text-gray-300 hover:bg-space-700"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOptions[currentQuestion.id]}
          className={`space-button ${
            !selectedOptions[currentQuestion.id] ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
