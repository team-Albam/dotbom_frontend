import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const QuizContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #ffe4e1 0%,
    #fff8dc 25%,
    #ffffff 50%,
    #f0f8ff 75%,
    #e6e6fa 100%
  );
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProgressText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;



const ProgressIndicator = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 8px;
  background: #E5E5E5;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: #51CBFF;
  transition: width 0.3s ease;
`;

const QuestionSection = styled.div<{ animationState: 'idle' | 'slideOut' | 'slideIn' }>`
  text-align: center;
  margin-bottom: 60px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${props => {
    if (props.animationState === 'slideOut') return 'translateX(-100%)';
    if (props.animationState === 'slideIn') return 'translateX(0)';
    return 'translateX(0)';
  }};
  opacity: ${props => props.animationState === 'slideOut' ? 0 : 1};
  
  ${props => props.animationState === 'slideIn' && `
    animation: slideInFromRight 0.3s ease-in-out;
  `}
  
  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;



const QuestionText = styled.p`
  font-size: 20px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 40px;
`;



const AnswerSection = styled.div<{ animationState: 'idle' | 'slideOut' | 'slideIn' }>`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 60px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${props => {
    if (props.animationState === 'slideOut') return 'translateX(-100%)';
    if (props.animationState === 'slideIn') return 'translateX(0)';
    return 'translateX(0)';
  }};
  opacity: ${props => props.animationState === 'slideOut' ? 0 : 1};
  
  ${props => props.animationState === 'slideIn' && `
    animation: slideInFromRight 0.3s ease-in-out;
  `}
`;

const AnswerCard = styled.button<{ selected: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: ${props => props.selected ? '#51CBFF' : 'white'};
  border: 2px solid ${props => props.selected ? '#51CBFF' : '#E5E5E5'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    border-color: #51CBFF;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(81, 203, 255, 0.3);
  }
`;

const AnswerText = styled.span<{ selected: boolean }>`
  font-size: 36px;
  font-weight: 700;
  color: ${props => props.selected ? 'white' : '#333'};
`;



interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "기초 생ㄹ수ㄱ자 → ㄹ에 들어갈 받침은?",
      options: ["ㅂ", "ㅁ"],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "임대주택 → '주'에 들어갈 받침은?",
      options: ["ㅁ", "ㅂ"],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "후불금 → '후'에 들어갈 받침은?",
      options: ["ㅂ", "ㅁ"],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "복지 서비스 → '복'의 받침은?",
      options: ["ㅁ", "ㄱ"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "납부 고지서 → '납'의 받침은?",
      options: ["ㅂ", "ㅁ"],
      correctAnswer: 0
    }
  ];
  
  

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));

  const [animationState, setAnimationState] = useState<'idle' | 'slideOut' | 'slideIn'>('idle');

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    // 슬라이드 아웃 애니메이션 시작
    setAnimationState('slideOut');
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        // 다음 문제로 이동
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);
        
        // 슬라이드 인 애니메이션 시작
        setAnimationState('slideIn');
        
        // 애니메이션 완료 후 idle 상태로 변경
        setTimeout(() => {
          setAnimationState('idle');
        }, 300);
      } else {
        // Quiz completed - calculate score and navigate to results
        const score = newAnswers.reduce((total, answer, index) => {
          return (total || 0) + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
        }, 0);
        
        navigate('/results', {
          state: {
            score: score,
            totalQuestions: quizQuestions.length
          }
        });
      }
    }, 400); // 애니메이션 시간에 맞춰 조정
  };



  const currentQuiz = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <QuizContainer>
      <Navigation />
      <ContentContainer>
        <ProgressSection>
          <ProgressText>다음 단어에서 ( ) 안에 들어갈 받침으로 알맞은 것을 골라주세요.</ProgressText>
          
          <ProgressContainer>
            <ProgressIndicator>
              {currentQuestion + 1} / {quizQuestions.length}
            </ProgressIndicator>
          </ProgressContainer>
          
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
        </ProgressSection>

        <QuestionSection animationState={animationState}>
          <QuestionText>
            {currentQuiz.question}
          </QuestionText>
        </QuestionSection>

        <AnswerSection animationState={animationState}>
          {currentQuiz.options.map((option, index) => (
            <AnswerCard
              key={index}
              selected={selectedAnswer === index}
              onClick={() => handleAnswerSelect(index)}
            >
              <AnswerText selected={selectedAnswer === index}>
                {option}
              </AnswerText>
            </AnswerCard>
          ))}
        </AnswerSection>


      </ContentContainer>
    </QuizContainer>
  );
};

export default Quiz;
