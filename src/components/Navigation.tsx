import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../contexts/SettingsContext";

const NavigationContainer = styled.nav`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.button`
  display: flex;
  align-items: center;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;

  &:focus {
    outline: none;
  }
`;


const LogoImg = styled.img`
  height: 40px;
  width: auto;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const MenuLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
  font-family: 'Arial', sans-serif;
  text-decoration: none;

  &:hover {
    color: #4682B4;
  }

  &:focus {
    outline: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsButton = styled.button`
  background: #4682B4;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  font-family: 'Arial', sans-serif;
  border: none;
  cursor: pointer;

  &:hover {
    background: #357ABD;
  }
`;

const Navigation: React.FC = () => {
  const { setIsModalOpen } = useSettings();
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate("/", { state: { scrollTo: "second" } });
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  return (
    <NavigationContainer>
      <NavWrapper>
        <LeftSection>
          <Logo onClick={handleLogoClick}>
            <LogoImg src="/img/logo.png" alt="Dotbom Logo" />
          </Logo>
        </LeftSection>

        <CenterSection>
          <MenuLink onClick={handleServiceClick}>서비스 안내</MenuLink>
          <MenuLink as={Link} to="/viewer">가독성 향상 뷰어</MenuLink>
          <MenuLink as={Link} to="/game">훈련 게임</MenuLink>
        </CenterSection>

        <RightSection>
          <SettingsButton onClick={handleSettingsClick}>
            사용자 맞춤 설정
          </SettingsButton>
        </RightSection>
      </NavWrapper>
    </NavigationContainer>
  );
};

export default Navigation;
