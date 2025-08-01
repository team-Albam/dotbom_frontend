import React from 'react';
import Navigation from '../components/Navigation';

const Game: React.FC = () => {
  const gameStyles = {
    game: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%)',
      paddingTop: '70px',
    },
    gameContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    gameTitle: {
      fontSize: '2.5rem',
      color: '#333',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: 600,
    },
    gameSection: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    gameSectionTitle: {
      fontSize: '2rem',
      color: '#333',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: 600,
    },
    gameOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
    },
    gameOption: {
      background: 'rgba(255, 255, 255, 0.7)',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      textAlign: 'center' as const,
    },
    gameOptionTitle: {
      fontSize: '1.5rem',
      color: '#4682B4',
      marginBottom: '15px',
      fontWeight: 600,
    },
    gameOptionText: {
      color: '#666',
      lineHeight: 1.6,
      marginBottom: '20px',
    },
    gameBtn: {
      background: 'linear-gradient(135deg, #4682B4, #87CEEB)',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
  };

  return (
    <div style={gameStyles.game}>
      <Navigation />
      <div style={gameStyles.gameContent}>
        <h1 style={gameStyles.gameTitle}>훈련 게임</h1>
        <div style={gameStyles.gameSection}>
          <h2 style={gameStyles.gameSectionTitle}>게임 선택</h2>
          <div style={gameStyles.gameOptions}>
            <div style={gameStyles.gameOption}>
              <h3 style={gameStyles.gameOptionTitle}>속도 훈련</h3>
              <p style={gameStyles.gameOptionText}>빠른 속도로 텍스트를 읽고 이해하는 능력을 향상시킵니다.</p>
              <button style={gameStyles.gameBtn}>시작하기</button>
            </div>
            <div style={gameStyles.gameOption}>
              <h3 style={gameStyles.gameOptionTitle}>집중력 훈련</h3>
              <p style={gameStyles.gameOptionText}>집중력을 향상시키는 게임을 통해 더 나은 읽기 능력을 기를 수 있습니다.</p>
              <button style={gameStyles.gameBtn}>시작하기</button>
            </div>
            <div style={gameStyles.gameOption}>
              <h3 style={gameStyles.gameOptionTitle}>이해력 훈련</h3>
              <p style={gameStyles.gameOptionText}>텍스트의 내용을 정확히 이해하는 능력을 향상시킵니다.</p>
              <button style={gameStyles.gameBtn}>시작하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game; 