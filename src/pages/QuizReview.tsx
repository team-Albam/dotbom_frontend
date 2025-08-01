import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import { type QuizQuestion } from "../types/quiz";

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
  width: 80%;
  padding: 2rem;
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
`;

const AnswerCard = styled.div<{ isCorrect: boolean; isUserAnswer: boolean }>`
  background-color: ${({ isCorrect, isUserAnswer }) =>
    isCorrect ? "#d4edda" : isUserAnswer ? "#f8d7da" : "#f1f3f5"};
  border-left: 6px solid
    ${({ isCorrect, isUserAnswer }) =>
      isCorrect ? "#28a745" : isUserAnswer ? "#dc3545" : "#adb5bd"};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
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

const QuizReview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const isCorrect = userAnswer === currentQuiz.correctAnswer;

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

        <AnswerSection>
          {currentQuiz.options
            .map((option, index) => ({
              index,
              content: option.optionContent,
              isUserAnswer: userAnswer === index,
              isCorrectAnswer: index === currentQuiz.correctAnswer,
            }))
            .filter(
              ({ isUserAnswer, isCorrectAnswer }) =>
                isUserAnswer || isCorrectAnswer
            )
            .map(({ index, content, isUserAnswer, isCorrectAnswer }) => (
              <AnswerCard
                key={index}
                isCorrect={isCorrectAnswer}
                isUserAnswer={isUserAnswer}
              >
                {isCorrectAnswer ? "✅ 정답" : isUserAnswer ? "❌ 선택" : ""}
                <div>{content}</div>
              </AnswerCard>
            ))}
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
      </ContentContainer>
    </ReviewContainer>
  );
};

export default QuizReview;
