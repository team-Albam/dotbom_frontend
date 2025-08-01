import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
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
  width: 180px;
  height: 180px;
  object-fit: contain;
`;

const CelebrationPlaceholder = styled.div`
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #51CBFF 0%, #469CC1 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 8px 24px rgba(81, 203, 255, 0.3);
`;

const CelebrationIcon = styled.div`
  font-size: 60px;
  color: white;
  position: relative;
  
  &::before {
    content: "🎉";
    position: absolute;
    top: -20px;
    left: -30px;
    font-size: 30px;
    animation: sparkle 2s infinite;
  }
  
  &::after {
    content: "✨";
    position: absolute;
    bottom: -20px;
    right: -30px;
    font-size: 25px;
    animation: sparkle 2s infinite 0.5s;
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`;

const ScoreSection = styled.div`
  margin-bottom: 50px;
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

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
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
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get score from location state or use default values
  const score = location.state?.score || 4; // Default to 4 out of 5 for demo
  const totalQuestions = location.state?.totalQuestions || 5;
  
  const handleViewResults = () => {
    // TODO: Navigate to detailed results page
    console.log('View detailed results');
  };
  
  const handleGoBack = () => {
    // Navigate back to difficulty selection
    navigate('/difficulty');
  };
  
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
      <ContentContainer>
        <MainTitle>훈련이 모두 완료되었습니다!</MainTitle>
        <SubTitle>{getScoreMessage()}</SubTitle>
        
        <IllustrationContainer>
          <CelebrationImage 
            src="/img/celebration.png" 
            alt="축하 이미지"
            onError={(e) => {
              // Hide the image and show placeholder if image fails to load
              e.currentTarget.style.display = 'none';
              const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'flex';
            }}
          />
          <CelebrationPlaceholder style={{ display: 'none' }}>
            <CelebrationIcon>🏆</CelebrationIcon>
          </CelebrationPlaceholder>
        </IllustrationContainer>
        
        <ScoreSection>
          <ScoreText>
            <ScoreHighlight>{score}</ScoreHighlight> / {totalQuestions} 맞췄습니다
          </ScoreText>
        </ScoreSection>
        
        <ButtonContainer>
          <ActionButton variant="primary" onClick={handleViewResults}>
            결과 확인하기
          </ActionButton>
          <ActionButton variant="secondary" onClick={handleGoBack}>
            돌아가기
          </ActionButton>
        </ButtonContainer>
      </ContentContainer>
    </ResultsContainer>
  );
};

export default QuizResults;
