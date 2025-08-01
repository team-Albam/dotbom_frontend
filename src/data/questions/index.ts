import { easyQuestions } from './easy';
import { mediumQuestions } from './medium';
import { hardQuestions } from './hard';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const getQuestionsByDifficulty = (difficulty: Difficulty): QuizQuestion[] => {
  switch (difficulty) {
    case 'easy':
      return easyQuestions;
    case 'medium':
      return mediumQuestions;
    case 'hard':
      return hardQuestions;
    default:
      return easyQuestions;
  }
};

export { easyQuestions, mediumQuestions, hardQuestions };
