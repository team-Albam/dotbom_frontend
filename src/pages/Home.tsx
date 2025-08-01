import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";

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

const GradientCircleTopRight = styled.div`
  position: absolute;
  top: -403px;
  left: 1457px;
  width: 926.58px;
  height: 926.58px;
  background: linear-gradient(135deg, #A100FF 7%, #18F1EE 100%);
  opacity: 0.4;
  filter: blur(100px);
  border-radius: 50%;
  z-index: 0;
`;

const GradientCircleLeftTop = styled.div`
  position: absolute;
  top: -507px;
  left: -651px;
  width: 1921.82px;
  height: 1921.82px;
  background: linear-gradient(
    135deg,
    rgba(255, 225, 0, 0.12) 0%,   // #FFE100
    rgba(255, 16, 0, 0.27) 50%,  // #FF1000
    rgba(241, 27, 208, 0.82) 100% // #F11BD0
  );
  opacity: 0.4;
  filter: blur(200px);
  border-radius: 50%;
  z-index: 0;
`;



const HomeContainer = styled.div<{ scrollY: number }>`
  min-height: 200vh;
  background: ${props => {
    const progress = Math.min(props.scrollY / window.innerHeight, 1);
    if (progress < 0.5) {
  return `linear-gradient(
    135deg,
rgb(234, 216, 185) 0%,
rgb(243, 185, 198) 35%,
    #F5D0FE 70%,
    #F0F8FF 100%
  )`;

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
  font-family: 'Pretendard', sans-serif;
  font-size: 3rem;         // 64px = 4rem
  font-weight: 800;        // ExtraBold (보통 800)
  color: #ffffff;
  line-height: 1.4;
  letter-spacing: -2.5%;
  text-align: center;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); // 배경 대비용 그림자
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem; // 반응형 대응
  }
`;


const MainTitle = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-size: 14.375rem; /* 230px */
  font-weight: 600; /* SemiBold */
  line-height: 1.4;
  letter-spacing: -2.5%;
  text-align: center;
  white-space: nowrap;
  text-shadow: 0 2px 6px rgba(85, 126, 221, 0.88); 
  margin: 0;

  /* ✅ 텍스트 불투명하게 유지 */
  opacity: 1;

  /* ✅ 텍스트 색상 표현을 위한 gradient */
  background: radial-gradient(
    circle at center,
    #FFF7E9 0%,
    #FFFFFF 49%,
    #FFF7E9 98%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;






const BottomText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 1rem;       // 40px
  font-weight: 400;
  margin-top: 0; 
  line-height: 1.4;
  letter-spacing: -2.5%;
  color: #877971;
  text-align: center;
  margin-top: 2rem;
  max-width: 800px;

  strong {
    font-weight: 700;
    color: #6A5E4F; 
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
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
const ThirdSection = styled.div`
  min-height: 50vh;
  margin-top: 10pc;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 50px;
  font-weight: 600; /* SemiBold */
  color: #ffffff;
  text-align: center;
  line-height: 1.4;
  letter-spacing: -0.025em;
  margin-bottom: 60px;
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #51cbff 0%,rgb(176, 79, 233) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;


const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 700px;
  height: 700px;
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



const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #51CBFF 0%, #9C88FF 100%);
  width: 47%;
  color: white;
  padding: 20px 40px;
  font-size: 1.1rem;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 40px;
  
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
  width: 100%;
  max-width: 800px;
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
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
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
  const location = useLocation();
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo === "second" && secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const features = [
    {
      title: "내가 원하는 글에 가독성을 더하다",
      image: "/img/contextInfo.png"
    },
    {
      title: "읽고 싶은 핵심만, AI 요약",
      image: "/img/ai.png"
    },
    {
      title: "복잡한 글 쉽게 읽기",
      image: "/img/easy.png"
    },
    {
      title: "TTS 낭독을 통해, 읽기 부담을 덜다",
      image: "/img/ttsInfo.png"
    },
    {
      title: "내 눈에 딱 맞게 맞춤, 사용자 맞춤 설정",
      image: "/img/setting.png"
    },
    {
      title: "읽기 훈련, 꾸준히 함께",
      image: "/img/test.png"
    }   
  ];

  return (
    <HomeContainer scrollY={scrollY}>
      <GradientCircleTopRight />
      <GradientCircleLeftTop />
      <Navigation/>
      <HomeContent>
        <TopText>
          당신의 시선이 돋보이도록
        </TopText>
        
        <MainTitle>Dotbom</MainTitle>
        
        <BottomText>
          당신의 읽기를 방해하는 모든 순간에, <strong>돋봄</strong>이 함께합니다
        </BottomText>
      </HomeContent>
      <div ref={secondSectionRef}>
    
      <SecondSection>
        <SectionTitle>
          <GradientText>난독증</GradientText>으로부터 불편함,<br />
          이제 돋봄이 덜어드리겠습니다.
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
        </SecondSection>
  </div>
        <ThirdSection>
        <CTAButton to="/viewer">
          지금 이용 이용해보세요
        </CTAButton>
        <BottomText>로그인 없이도 바로 이용할 수 있어요</BottomText>
        <DivLine/>
        </ThirdSection>
      
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
     
    </HomeContainer>
  );
};

export default Home;