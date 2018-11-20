export interface Quiz {
  index: number;
  quizzes_group: string;
  question: string;
  allowTryAgain: boolean;
  allowShowAnswer: boolean;
  timeStamp: string;
  timeStampEnd: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: number;
  answer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizGroup {
  _id: string;
  questions: Quiz[];
  workshop: string;
}
