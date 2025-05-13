
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  source: string;
  sourceUrl: string;
  quiz: Quiz;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
}

export interface UserScore {
  quizId: string;
  score: number;
  totalQuestions: number;
  date: Date;
}

export interface GameScore {
  gameId: string;
  score: number;
  date: Date;
}
