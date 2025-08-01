export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const hardQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "국민건강보험공단 → '공단'의 받침은?",
    options: ["ㅇ", "ㄴ"],
    correctAnswer: 1,
    explanation: "'공단'에서 '단'의 받침은 'ㄴ'이 맞습니다. '공단'은 'ㄴ' 받침으로 발음됩니다."
  },
  {
    id: 2,
    question: "장기요양보험 → '장기'의 받침은?",
    options: ["ㅇ", "ㄱ"],
    correctAnswer: 1,
    explanation: "'장기'에서 '기'의 받침은 'ㄱ'이 맞습니다. '장기'는 'ㄱ' 받침으로 발음됩니다."
  },
  {
    id: 3,
    question: "산업재해보상 → '산업'의 받침은?",
    options: ["ㅂ", "ㄴ"],
    correctAnswer: 0,
    explanation: "'산업'에서 '업'의 받침은 'ㅂ'이 맞습니다. '산업'은 'ㅂ' 받침으로 발음됩니다."
  },
  {
    id: 4,
    question: "고용보험급여 → '고용'의 받침은?",
    options: ["ㅇ", "ㄱ"],
    correctAnswer: 0,
    explanation: "'고용'에서 '용'의 받침은 'ㅇ'이 맞습니다. '고용'은 'ㅇ' 받침으로 발음됩니다."
  },
  {
    id: 5,
    question: "근로복지공단 → '근로'의 받침은?",
    options: ["ㄹ", "ㅇ"],
    correctAnswer: 0,
    explanation: "'근로'에서 '로'의 받침은 'ㄹ'이 맞습니다. '근로'는 'ㄹ' 받침으로 발음됩니다."
  }
];
