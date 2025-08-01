import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

const ServiceContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%);
  padding-top: 70px;
`;

const ServiceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ServiceTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
`;

const ServiceInfo = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const ServiceInfoTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ServiceInfoText = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const ServiceFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Feature = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #4682B4;
  margin-bottom: 15px;
  font-weight: 600;
`;

const FeatureText = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Service: React.FC = () => {
  return (
    <ServiceContainer>
      <Navigation />
      <ServiceContent>
        <ServiceTitle>서비스 안내</ServiceTitle>
        <ServiceInfo>
          <ServiceInfoTitle>Dotbom 서비스 소개</ServiceInfoTitle>
          <ServiceInfoText>Dotbom은 가독성 향상과 훈련 게임을 통해 사용자에게 더 나은 경험을 제공합니다.</ServiceInfoText>
          
          <ServiceFeatures>
            <Feature>
              <FeatureTitle>가독성 향상 뷰어</FeatureTitle>
              <FeatureText>텍스트의 가독성을 향상시키는 도구를 제공합니다.</FeatureText>
            </Feature>
            <Feature>
              <FeatureTitle>훈련 게임</FeatureTitle>
              <FeatureText>재미있는 게임을 통해 능력을 향상시킬 수 있습니다.</FeatureText>
            </Feature>
            <Feature>
              <FeatureTitle>사용자 맞춤 설정</FeatureTitle>
              <FeatureText>개인에 맞는 설정을 통해 최적화된 경험을 제공합니다.</FeatureText>
            </Feature>
          </ServiceFeatures>
        </ServiceInfo>
      </ServiceContent>
    </ServiceContainer>
  );
};

export default Service; 