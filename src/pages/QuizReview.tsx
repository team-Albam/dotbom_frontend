import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import type { QuizQuestion } from "../data/questions";

const ReviewContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionBox = styled.div`
  width: 70%;
  padding: 4rem;
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: row;  /* 가로 방향 */
  gap: 1rem;
  width: 80%;
  justify-content: center;  /* 가운데 정렬 */
  flex-wrap: nowrap; /* 필요하면 nowrap 유지 */
`;

const AnswerCard = styled.div<{ isCorrect: boolean; isUserAnswer: boolean }>`
  background-color: ${({ isCorrect, isUserAnswer }) =>
    isCorrect ? "#d4edda" : isUserAnswer ? "#f8d7da" : "#f1f3f5"};
  border: 2px solid
    ${({ isCorrect, isUserAnswer }) =>
      isCorrect ? "#28a745" : isUserAnswer ? "#dc3545" : "#adb5bd"};
  padding: 1rem;
  border-radius: 8px;
  width: 45%; /* 두 개가 나란히 보여야 하니까 적당히 반반 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 80px;
`;


const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
  width: 80%;
`;

const NavButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #6c757d;
  color: white;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #495057;
  }
`;

const ScoreDisplay = styled.h2`
  margin-bottom: 2rem;
  color: #343a40;
`;

const BackButton = styled(Link)`
  padding: 12px 24px;
  margin-top: 2rem;
  border: 2px solid #51CBFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #51CBFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #51CBFF;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(81, 203, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ExplanationBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  width: 70%;
  margin: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #51CBFF;
  text-align: left;
`;

const ExplanationTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
`;

const ExplanationText = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

const QuizReview: React.FC = () => {
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const score = location.state?.score;
  const totalQuestions = location.state?.totalQuestions;
  const userAnswers = location.state?.userAnswers;
  const quizQuestions: QuizQuestion[] = location.state?.quizQuestions || [];
  
  // 👉 여기에 로그 추가
  console.log("score:", score);
  console.log("totalQuestions:", totalQuestions);
  console.log("userAnswers:", userAnswers);
  console.log("quizQuestions:", quizQuestions);
  

  if (quizQuestions.length === 0 || !userAnswers) {
    return (
      <ReviewContainer>
        <Navigation />
        <ContentContainer>
          <div>문제 데이터를 찾을 수 없습니다.</div>
        </ContentContainer>
      </ReviewContainer>
    );
  }


  const currentQuiz = quizQuestions[currentQuestion];
  const userAnswer = userAnswers[currentQuestion];

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1)
      setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <ReviewContainer>
      <Navigation />
      <ContentContainer>
        <ScoreDisplay>
          총 점수: {score} / {totalQuestions}
        </ScoreDisplay>

        <QuestionBox>
          <h3>Q{currentQuestion + 1}. {currentQuiz.question}</h3>
        </QuestionBox>
        <ExplanationBox>
          <ExplanationTitle>해설</ExplanationTitle>
          <ExplanationText>{currentQuiz.explanation}</ExplanationText>
        </ExplanationBox>

        <AnswerSection>
  {currentQuiz.options.map((option, index) => {
    const isUserAnswer = userAnswer === index;
    const isCorrectAnswer = index === currentQuiz.correctAnswer;
    const userWasCorrect = userAnswer === currentQuiz.correctAnswer;

    let label = "";
    if (userWasCorrect && isUserAnswer) {
      label = "✅ 정답";
    } else if (!userWasCorrect) {
      if (isUserAnswer) label = "❌ 선택";
      if (isCorrectAnswer) label = "✅ 정답";
    }

    return (
      <AnswerCard
        key={index}
        isCorrect={isCorrectAnswer}
        isUserAnswer={isUserAnswer}
      >
        <div>{label}</div>
        <div>{option}</div>
      </AnswerCard>
    );
  })}
</AnswerSection>

   
        <NavigationButtons>
          <NavButton onClick={handlePrev} disabled={currentQuestion === 0}>
            이전
          </NavButton>
          <NavButton
            onClick={handleNext}
            disabled={currentQuestion === quizQuestions.length - 1}
          >
            다음
          </NavButton>
          
        </NavigationButtons>
        <BackButton to="/game">
          결과로 돌아가기
        </BackButton>
      </ContentContainer>
    </ReviewContainer>
  );
};

export default QuizReview;
