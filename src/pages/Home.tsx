import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';

// Color interpolation helper function
const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const HomeContainer = styled.div<{ scrollY: number }>`
  min-height: 200vh;
  background: ${props => {
    const progress = Math.min(props.scrollY / window.innerHeight, 1);
    if (progress < 0.5) {
      return `linear-gradient(135deg, #E8B4CB 0%, #D8A7CA 25%, #C8A2C8 50%, #B8A9C9 75%, #A8B0CA 100%)`;
    } else {
      const fadeProgress = (progress - 0.5) * 2;
      return `linear-gradient(135deg, 
        ${interpolateColor('#E8B4CB', '#2D1B69', fadeProgress)} 0%, 
        ${interpolateColor('#D8A7CA', '#1A0F3A', fadeProgress)} 25%, 
        ${interpolateColor('#C8A2C8', '#0F0A1F', fadeProgress)} 50%, 
        ${interpolateColor('#B8A9C9', '#0A0612', fadeProgress)} 75%, 
        ${interpolateColor('#A8B0CA', '#000000', fadeProgress)} 100%)`;
    }
  }};
  padding-top: 70px;
  position: relative;
  transition: background 0.3s ease;
`;

const HomeContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const TopText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 300;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const MainTitle = styled.h1`
  font-size: 8rem;
  font-weight: 300;
  color: white;
  margin: 40px 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -2px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const BottomText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 300;
  margin-top: 40px;
  line-height: 1.5;
  max-width: 600px;
`;

// Second section styles
const SecondSection = styled.div`
  min-height: 100vh;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  color: #51CBFF;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 60px;
  line-height: 1.4;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 800px;
  width: 100%;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 5px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureImg = styled.img`
  width: 300px;
  height: 250px;
`;

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 10px;
`;



const CTAButton = styled.button`
  background: linear-gradient(135deg, #51CBFF 0%, #9C88FF 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 40px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(81, 203, 255, 0.3);
  }
`;

const FooterSection = styled.div`
  padding: 40px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;



const DivLine = styled.hr`
  border: none;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  margin: 40px auto;
  width: 100%;
`;


const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const FooterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FooterInfo = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FooterLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FooterLogoImg = styled.img`
  width: 80px;
  height: 50px;
`;

const FooterLogoText = styled.img`
  width: 60px;
  height: 50px;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const CompanyName = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CompanyDetails = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "내가 원하는 글에 가독성을 더하다",
      image: "/img/contextInfo.png"
    },
    {
      title: "읽고 싶은 핵심만, AI 요약",
      image: "/img/feature2.png"
    },
    {
      title: "복잡한 글 쉽게 읽기",
      image: "/img/feature3.png"
    },
    {
      title: "TTS 낭독을 통해, 읽기 부담을 덜다",
      image: "/img/ttsInfo.png"
    },
    {
      title: "내 눈에 딱 맞게 맞춤, 사용자 맞춤 설정",
      image: "/img/feature5.png"
    },
    {
      title: "읽기 훈련, 꾸준히 함께",
      image: "/img/feature6.png"
    }   
  ];

  return (
    <HomeContainer scrollY={scrollY}>
      <Navigation />
      <HomeContent>
        <TopText>
          학습의 시작이 곧 성장의 시작<br />
          당신의 시선이 흘러가도록
        </TopText>
        
        <MainTitle>Dotbom</MainTitle>
        
        <BottomText>
          당신의 읽기를 향해하는 모든 순간에, 돌봄이 함께합니다
        </BottomText>
      </HomeContent>
      
      <SecondSection>
        <SectionTitle>
          부족으로부터의 불편함,<br />
          이제 돌봄이 되어드리겠습니다.
        </SectionTitle>
        
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <div>
                <FeatureImg src={feature.image} alt={feature.title} />
                <FeatureTitle>{feature.title}</FeatureTitle>
              </div>
            </FeatureCard>
          ))}
        </FeatureGrid>
        
        <CTAButton>
          지금 이용 이용해보세요
        </CTAButton>
        <BottomText>로그인 없이도 바로 이용할 수 있어요</BottomText>
        <DivLine/>
        <FooterSection>
          <FooterContent>
            <FooterHeader>
              <FooterInfo>Come join us</FooterInfo>
              <FooterLogos>
                <FooterLogoImg src="/img/Logo2.png" alt="Dotbom Logo" />
                <FooterLogoText src="/img/Logo2Title.png" alt="Dotbom Title" />
              </FooterLogos>
            </FooterHeader>
            
            <CompanyInfo>
              <CompanyName>(주)알밤이네</CompanyName>
              <CompanyDetails>이용약관 개인정보처리방침</CompanyDetails>
              <CompanyDetails>
                경기도 용인시 기흥구 강남로 40 ㅣ TEL. 031-280-3500 ㅣ EMAIL. dotbom@kangnam.ac.kr ㅣ 사업자등록번호 000-00-00000
              </CompanyDetails>
            </CompanyInfo>
          </FooterContent>
        </FooterSection>
      </SecondSection>
    </HomeContainer>
  );
};

export default Home;