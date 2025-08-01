import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { fetchQuestionsByDifficulty, type QuizQuestion, type Difficulty } from "../services/api";

const ReviewContainer = styled.div`
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

const ReviewProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ReviewProgressText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const ReviewProgressIndicator = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const ReviewQuestionSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ReviewQuestionText = styled.p`
  font-size: 20px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const ReviewAnswerSection = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 40px;
`;

const ReviewAnswerCard = styled.div<{ isCorrect: boolean; isUserAnswer: boolean; showBothAnswers: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: white; // Always white background
  border: 2px solid ${props => {
    if (!props.showBothAnswers && props.isCorrect) return '#4CAF50';
    if (props.showBothAnswers) {
      if (props.isCorrect) return '#4CAF50';
      if (props.isUserAnswer) return '#F44336';
    }
    return '#E5E5E5';
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const AnswerLabel = styled.div<{ isCorrect: boolean; isUserAnswer: boolean; showBothAnswers: boolean }>`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${props => {
    if (!props.showBothAnswers && props.isCorrect) return '#4CAF50';
    if (props.showBothAnswers) {
      if (props.isCorrect) return '#4CAF50';
      if (props.isUserAnswer) return '#F44336';
    }
    return 'transparent';
  }};
  display: ${props => {
    if (!props.showBothAnswers && props.isCorrect) return 'block';
    if (props.showBothAnswers && (props.isCorrect || props.isUserAnswer)) return 'block';
    return 'none';
  }};
`;

const ReviewAnswerText = styled.span<{ isCorrect: boolean; isUserAnswer: boolean; showBothAnswers: boolean }>`
  font-size: 36px;
  font-weight: 700;
  color: #333; // Always black text since background is always white
`;

const ExplanationBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 40px;
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

const NavigationContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  background: ${props => props.disabled ? '#E5E5E5' : '#51CBFF'};
  color: ${props => props.disabled ? '#999' : 'white'};
  box-shadow: ${props => props.disabled ? 'none' : '0 4px 12px rgba(81, 203, 255, 0.3)'};
  
  &:hover {
    ${props => !props.disabled && `
      background: #469CC1;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(81, 203, 255, 0.4);
    `}
  }
  
  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

const BackButton = styled(Link)`
  padding: 12px 24px;
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



const QuizReview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get data from location state (passed from QuizResults)
  const score = location.state?.score;
  const totalQuestions = location.state?.totalQuestions;
  const userAnswers = location.state?.userAnswers;
  const difficulty = location.state?.difficulty || 'easy';
  
  // Load questions based on difficulty
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        const difficultyLevel = difficulty as Difficulty;
        const questions = await fetchQuestionsByDifficulty(difficultyLevel);
        setQuizQuestions(questions);
      } catch (err) {
        console.error('Failed to load questions:', err);
        setError(err instanceof Error ? err.message : '문제를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [difficulty]);
  
  // Handle loading state
  if (loading) {
    return (
      <ReviewContainer>
        <Navigation />
        <ContentContainer>
          <div>문제를 불러오는 중...</div>
        </ContentContainer>
      </ReviewContainer>
    );
  }

  // Handle error state
  if (error) {
    return (
      <ReviewContainer>
        <Navigation />
        <ContentContainer>
          <div style={{ color: '#F44336', textAlign: 'center' }}>
            <h3>오류가 발생했습니다</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '10px 20px',
                backgroundColor: '#51CBFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              다시 시도
            </button>
          </div>
        </ContentContainer>
      </ReviewContainer>
    );
  }

  // Don't render if questions aren't loaded yet
  if (quizQuestions.length === 0) {
    return (
      <ReviewContainer>
        <Navigation />
        <ContentContainer>
          <div>문제를 불러오는 중...</div>
        </ContentContainer>
      </ReviewContainer>
    );
  }

  const currentQuiz = quizQuestions[currentQuestion];
  const userAnswer = userAnswers?.[currentQuestion];
  const isCorrect = userAnswer === currentQuiz.correctAnswer;
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  


  return (
    <ReviewContainer>
      <Navigation />
      <ContentContainer>
        <ReviewProgressSection>
          <ReviewProgressText>문제 해설을 확인해보세요.</ReviewProgressText>
          <ReviewProgressIndicator>
            {currentQuestion + 1} / {quizQuestions.length}
          </ReviewProgressIndicator>
        </ReviewProgressSection>

        <ReviewQuestionSection>
          <ReviewQuestionText>
            {currentQuiz.question}
          </ReviewQuestionText>
        </ReviewQuestionSection>

        <ReviewAnswerSection>
          {currentQuiz.options.map((option, index) => {
            const isUserAnswer = userAnswer === index;
            const isCorrectAnswer = index === currentQuiz.correctAnswer;
            const showBothAnswers = !isCorrect; // Show both answers only when user got it wrong
            
            return (
              <ReviewAnswerCard
                key={index}
                isCorrect={isCorrectAnswer}
                isUserAnswer={isUserAnswer}
                showBothAnswers={showBothAnswers}
              >
                <AnswerLabel
                  isCorrect={isCorrectAnswer}
                  isUserAnswer={isUserAnswer}
                  showBothAnswers={showBothAnswers}
                >
                  {isCorrectAnswer ? '정답' : (isUserAnswer ? '오답' : '')}
                </AnswerLabel>
                <ReviewAnswerText 
                  isCorrect={isCorrectAnswer}
                  isUserAnswer={isUserAnswer}
                  showBothAnswers={showBothAnswers}
                >
                  {option}
                </ReviewAnswerText>
              </ReviewAnswerCard>
            );
          })}
        </ReviewAnswerSection>

        <ExplanationBox>
          <ExplanationTitle>해설</ExplanationTitle>
          <ExplanationText>{currentQuiz.explanation}</ExplanationText>
        </ExplanationBox>

        <NavigationContainer>
          <NavButton 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            이전
          </NavButton>
          
          <NavButton 
            onClick={handleNextQuestion}
            disabled={currentQuestion === quizQuestions.length - 1}
          >
            다음
          </NavButton>
        </NavigationContainer>

        <BackButton to="/results">
          결과로 돌아가기
        </BackButton>
      </ContentContainer>
    </ReviewContainer>
  );
};

export default QuizReview;
