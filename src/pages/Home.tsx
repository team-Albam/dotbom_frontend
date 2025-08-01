import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%);
  padding-top: 70px;
`;

const HomeContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WelcomeSection = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const WelcomeTitle = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

const WelcomeText = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Navigation />
      <HomeContent>
        <WelcomeSection>
          <WelcomeTitle>Dotbom에 오신 것을 환영합니다</WelcomeTitle>
          <WelcomeText>가독성 향상과 훈련 게임을 통해 더 나은 경험을 제공합니다</WelcomeText>
        </WelcomeSection>
      </HomeContent>
    </HomeContainer>
  );
};

export default Home; 