// src/types/QuizTypes.ts
export interface Quiz {
  ttotiId: number;
  quizId: number;
  quizDate: string;
  quizChoiceContent: string;
  quizType: 'OX' | 'TWO_CHOICE' | 'FOUR_CHOICE';
  quizChoiceMap: { [key: string]: string };
  isManittoAnswered: boolean;
  manittoAnswer: number | null;
  isManitiAnswered: boolean;
  manitiAnswer: number | null;
  quizAnswerIsCorrect: boolean;
}

export interface TodayQuiz extends Quiz {
  quizType: 'OX' | 'TWO_CHOICE' | 'FOUR_CHOICE';
}

export interface QuizData {
  manittoQuizList: Quiz[];
  manitiQuizList: Quiz[];
  todayManittoQuiz: TodayQuiz;
  todayManitiQuiz: TodayQuiz;
}
