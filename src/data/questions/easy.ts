export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const easyQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "기초 생ㄹ수ㄱ자 → ㄹ에 들어갈 받침은?",
    options: ["ㅂ", "ㅁ"],
    correctAnswer: 1,
    explanation: "'생리수급자'에서 'ㄹ' 받침은 'ㅁ'이 맞습니다. 'ㅁ' 받침은 비음으로 자연스럽게 발음됩니다."
  },
  {
    id: 2,
    question: "임대주택 → '주'에 들어갈 받침은?",
    options: ["ㅁ", "ㅂ"],
    correctAnswer: 0,
    explanation: "'임대주택'에서 '주'의 받침은 'ㅁ'이 맞습니다. '주택'은 'ㅁ' 받침으로 발음됩니다."
  },
  {
    id: 3,
    question: "후불금 → '후'에 들어갈 받침은?",
    options: ["ㅂ", "ㅁ"],
    correctAnswer: 0,
    explanation: "'후불금'에서 '후'의 받침은 'ㅂ'이 맞습니다. '후불'은 'ㅂ' 받침으로 발음됩니다."
  },
  {
    id: 4,
    question: "복지 서비스 → '복'의 받침은?",
    options: ["ㅁ", "ㄱ"],
    correctAnswer: 1,
    explanation: "'복지'에서 '복'의 받침은 'ㄱ'이 맞습니다. '복지'는 'ㄱ' 받침으로 발음됩니다."
  },
  {
    id: 5,
    question: "납부 고지서 → '납'의 받침은?",
    options: ["ㅂ", "ㅁ"],
    correctAnswer: 0,
    explanation: "'납부'에서 '납'의 받침은 'ㅂ'이 맞습니다. '납부'는 'ㅂ' 받침으로 발음됩니다."
  }
];
