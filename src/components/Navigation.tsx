import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navStyles = {
    navigation: {
      background: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '70px',
    },
    navLeft: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoShapes: {
      display: 'flex',
      gap: '2px',
    },
    logoShape: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #87CEEB, #4682B4)',
    },
    logoShape1: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #87CEEB, #4682B4)',
      transform: 'translateY(-2px)',
    },
    logoShape2: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #87CEEB, #4682B4)',
      transform: 'translateY(2px)',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#333',
      fontFamily: 'Arial, sans-serif',
    },
    navRight: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    },
    navLink: {
      textDecoration: 'none',
      color: '#333',
      fontSize: '16px',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      fontFamily: 'Arial, sans-serif',
    },
  };

  return (
    <nav style={navStyles.navigation}>
      <div style={navStyles.navContainer}>
        <div style={navStyles.navLeft}>
          <Link to="/" style={navStyles.logo}>
            <div style={navStyles.logoShapes}>
              <div style={navStyles.logoShape1}></div>
              <div style={navStyles.logoShape2}></div>
            </div>
            <span style={navStyles.logoText}>Dotbom</span>
          </Link>
        </div>
        <div style={navStyles.navRight}>
          <Link to="/service" style={navStyles.navLink}>서비스 안내</Link>
          <Link to="/viewer" style={navStyles.navLink}>가독성 향상 뷰어</Link>
          <Link to="/game" style={navStyles.navLink}>훈련 게임</Link>
          <Link to="/settings" style={navStyles.navLink}>사용자 맞춤 설정</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 