import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const SelectionContainer = styled.div`
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
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const MainTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 40px 0 80px 0;
  line-height: 1.4;
`;

const DifficultyGrid = styled.div`
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const DifficultyCard = styled.div<{ color: string }>`
  width: 240px;
  height: 240px;
  padding: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid #51CBFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #469CC1;
    border-color: #6B9BD1;
    transform: translateY(-8px);
    box-shadow: 0 12px 32px #51CBFF, 0 0 40px #51CBFF;
    border-width: 4px;
    
    h2 {
      color: white;
    }
    
    p {
      color: white;
    }
  }
`;

const DifficultyLevel = styled.h2<{ color: string }>`
  font-size: 48px;
  font-weight: 700;
  color: #51CBFF;
  margin: 0 0 20px 0;
  transition: color 0.3s ease;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const StarIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const DifficultyDescription = styled.p`
  font-size: 14px;
  color: #44A6D0;
  margin: 0;
  font-weight: 500;
  transition: color 0.3s ease;
`;

interface DifficultyOption {
  level: string;
  color: string;
  stars: number;
  description: string;
}

const difficultyOptions: DifficultyOption[] = [
  {
    level: "상",
    color: "#FF6B6B",
    stars: 3,
    description: "숙련자를 위한 고난이도"
  },
  {
    level: "중",
    color: "#4ECDC4",
    stars: 2,
    description: "응용력과 집중력이 필요한 단계"
  },
  {
    level: "하",
    color: "#45B7D1",
    stars: 1,
    description: "기초부터 천천히"
  }
];

const DifficultySelection: React.FC = () => {
  const navigate = useNavigate();

  const handleDifficultySelect = (level: string) => {
    console.log(`Selected difficulty: ${level}`);
    // Navigate to quiz page with selected difficulty
    navigate(`/quiz/${level.toLowerCase()}`);
  };

  return (
    <SelectionContainer>
      <Navigation />
      <ContentContainer>
        <MainTitle>난이도를 선택해주세요</MainTitle>
        
        <DifficultyGrid>
          {difficultyOptions.map((option) => (
            <DifficultyCard
              key={option.level}
              color={option.color}
              onClick={() => handleDifficultySelect(option.level)}
            >
              <DifficultyLevel color={option.color}>
                {option.level}
              </DifficultyLevel>
              
              <StarContainer>
                {Array.from({ length: option.stars }, (_, index) => (
                  <StarIcon
                    key={index}
                    src="/img/Star.png"
                    alt="star"
                  />
                ))}
              </StarContainer>
              
              <DifficultyDescription>
                {option.description}
              </DifficultyDescription>
            </DifficultyCard>
          ))}
        </DifficultyGrid>
      </ContentContainer>
    </SelectionContainer>
  );
};

export default DifficultySelection;
