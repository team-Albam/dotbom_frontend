import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Confetti from 'react-confetti';
import Navigation from "../components/Navigation";

const ResultsContainer = styled.div`
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
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 20px;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.4;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 60px 0;
  line-height: 1.5;
`;

const IllustrationContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 0 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CelebrationImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const ScoreSection = styled.div`
  margin: 0 0 40px 0;
`;

const ScoreText = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #51CBFF;
  margin: 0;
`;

const ScoreHighlight = styled.span`
  color: #469CC1;
  font-size: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled(Link)<{ variant: 'primary' | 'secondary' }>`
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  
  ${props => props.variant === 'primary' ? `
    background: #51CBFF;
    color: white;
    box-shadow: 0 4px 12px rgba(81, 203, 255, 0.3);
    
    &:hover {
      background: #469CC1;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(81, 203, 255, 0.4);
    }
  ` : `
    background: white;
    color: #51CBFF;
    border: 2px solid #51CBFF;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    &:hover {
      background: #51CBFF;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(81, 203, 255, 0.3);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
`;



interface QuizResultsProps {
  score?: number;
  totalQuestions?: number;
}

const QuizResults: React.FC<QuizResultsProps> = () => {
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Get score from location state or use default values
  const score = location.state?.score || 4; // Default to 4 out of 5 for demo
  const totalQuestions = location.state?.totalQuestions || 5;

  // 색종이 애니메이션 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500); // 0.5초 후에 색종이 시작
    
    // 3초 후에 색종이 종료
    const hideTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);
  
  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  


  
  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) {
      return "훌륭합니다! 계속해서 연습하시면 더욱 향상될 거예요!";
    } else if (percentage >= 60) {
      return "잘하셨습니다! 조금 더 연습하면 완벽해질 거예요!";
    } else {
      return "아직 연습이 더 필요해요. 포기하지 말고 계속 도전해보세요!";
    }
  };

  return (
    <ResultsContainer>
      <Navigation />
      
      {/* 색종이 애니메이션 */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={100}
          recycle={false}
          colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#51CBFF']}
          gravity={0.3}
          wind={0.01}
          initialVelocityY={-10}
          opacity={1}
        />
      )}
      
      <ContentContainer>
        <MainTitle>훈련이 모두 완료되었습니다!</MainTitle>
        <SubTitle>{getScoreMessage()}</SubTitle>
        
        <IllustrationContainer>
          <CelebrationImage 
            src="/img/result.png" 
            alt="축하 이미지"
          />
        </IllustrationContainer>
        
        <ScoreSection>
          <ScoreText>
            <ScoreHighlight>{score}</ScoreHighlight> / {totalQuestions} 맞췄습니다
          </ScoreText>
        </ScoreSection>
        
        <ButtonContainer>
          <ActionButton variant="primary" to="/review">
            결과 확인하기
          </ActionButton>
          <ActionButton variant="secondary" to="/game" >
            돌아가기
          </ActionButton>
        </ButtonContainer>
      </ContentContainer>
    </ResultsContainer>
  );
};

export default QuizResults;
