import React from 'react';
import Navigation from '../components/Navigation';

const Home: React.FC = () => {
  const homeStyles = {
    home: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%)',
      paddingTop: '70px',
    },
    homeContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeSection: {
      textAlign: 'center' as const,
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '60px 40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    welcomeTitle: {
      fontSize: '3rem',
      color: '#333',
      marginBottom: '20px',
      fontWeight: 600,
    },
    welcomeText: {
      fontSize: '1.2rem',
      color: '#666',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={homeStyles.home}>
      <Navigation />
      <div style={homeStyles.homeContent}>
        <div style={homeStyles.welcomeSection}>
          <h1 style={homeStyles.welcomeTitle}>Dotbom에 오신 것을 환영합니다</h1>
          <p style={homeStyles.welcomeText}>가독성 향상과 훈련 게임을 통해 더 나은 경험을 제공합니다</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 