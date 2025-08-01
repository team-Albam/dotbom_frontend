export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mediumQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "건강보험료 → '건강'의 받침은?",
    options: ["ㅇ", "ㄱ"],
    correctAnswer: 1,
    explanation: "'건강'에서 '강'의 받침은 'ㄱ'이 맞습니다. '건강'은 'ㄱ' 받침으로 발음됩니다."
  },
  {
    id: 2,
    question: "의료비 지원 → '의료'의 받침은?",
    options: ["ㅇ", "ㄹ"],
    correctAnswer: 1,
    explanation: "'의료'에서 '료'의 받침은 'ㄹ'이 맞습니다. '의료'는 'ㄹ' 받침으로 발음됩니다."
  },
  {
    id: 3,
    question: "복리후생 → '복리'의 받침은?",
    options: ["ㄱ", "ㅂ"],
    correctAnswer: 0,
    explanation: "'복리'에서 '복'의 받침은 'ㄱ'이 맞습니다. '복리'는 'ㄱ' 받침으로 발음됩니다."
  },
  {
    id: 4,
    question: "연금수급 → '연금'의 받침은?",
    options: ["ㅁ", "ㄴ"],
    correctAnswer: 0,
    explanation: "'연금'에서 '금'의 받침은 'ㅁ'이 맞습니다. '연금'은 'ㅁ' 받침으로 발음됩니다."
  },
  {
    id: 5,
    question: "사회보장 → '사회'의 받침은?",
    options: ["ㅇ", "ㅎ"],
    correctAnswer: 0,
    explanation: "'사회'에서 '회'의 받침은 'ㅇ'이 맞습니다. '사회'는 'ㅇ' 받침으로 발음됩니다."
  }
];
