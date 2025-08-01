import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { FaSearch } from "react-icons/fa";

const GameContainer = styled.div`
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
  position: relative;
  overflow: hidden;
`;

const GradientCircle = styled.div`
  position: absolute;
  top: -280px;
  left: 1395px;
  width: 926.58px;
  height: 926.58px;
  background: linear-gradient(135deg, #a100ff 7%, #18f1ee 100%);
  opacity: 0.4;
  filter: blur(100px);
  border-radius: 50%;
  z-index: 0;
`;

const GradientCircleLeft = styled.div`
  position: absolute;
  top: 292px;
  left: -654px;
  width: 1184.52px;
  height: 1184.52px;
  background: linear-gradient(
    135deg,
    #ffe100 0%,
    rgb(187, 101, 94) 50%,
    rgb(220, 141, 208) 100%
  );
  opacity: 0.4;
  filter: blur(100px);
  border-radius: 50%;
  z-index: 0;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
`;

const ProgressLabel = styled.span`
  font-size: 16px;
  color: #4a90e2;
  font-weight: bold;
`;

const ProgressIndicator = styled.div`
  display: flex;
  gap: 8px;
`;

const LifeIcon = styled(FaSearch)<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#4A90E2" : "#D1D5DB")};
  font-size: 18px;
`;

const MainTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 0 0 60px 0;
  line-height: 1.4;
`;

const BookIllustration = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 0 50px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookStack = styled.img`
  position: relative;
  transform-style: preserve-3d;
  width: 300px;
  height: 300px;
`;

const StartButton = styled.button`
  background: #00b2ff;
  margin-top: 40px;
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);

  &:hover {
    background: #0099cc;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MAX_LIVES = 3;
const LOCAL_STORAGE_KEY = "training_lives";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [lives, setLives] = useState<number>(MAX_LIVES);

  useEffect(() => {
    const storedLives = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLives !== null) {
      setLives(Number(storedLives));
    }
  }, []);

  const handleStartTraining = () => {
    if (lives > 0) {
      const newLives = lives - 1;
      setLives(newLives);
      localStorage.setItem(LOCAL_STORAGE_KEY, newLives.toString());
      navigate("/difficulty");
    } else {
      alert("기회가 모두 소진되었습니다. 광고를 시청해 기회를 회복하세요!");
    }
  };

  return (
    <GameContainer>
      <GradientCircle />
      <GradientCircleLeft />
      <Navigation />
      <ContentContainer>
        <ProgressSection>
          <ProgressLabel>훈련 기회</ProgressLabel>
          <ProgressIndicator>
            {[...Array(MAX_LIVES)].map((_, index) => (
              <LifeIcon key={index} active={index < lives} />
            ))}
          </ProgressIndicator>
        </ProgressSection>

        <MainTitle>훈련을 통해 조금씩, 확실하게 성장하세요</MainTitle>

        <BookIllustration>
          <BookStack src="/img/books.png" />
        </BookIllustration>

        <StartButton onClick={handleStartTraining}>훈련 시작하기</StartButton>
      </ContentContainer>
    </GameContainer>
  );
};

export default Game;
