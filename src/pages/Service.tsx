import React from 'react';
import Navigation from '../components/Navigation';

const Service: React.FC = () => {
  const serviceStyles = {
    service: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%)',
      paddingTop: '70px',
    },
    serviceContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    serviceTitle: {
      fontSize: '2.5rem',
      color: '#333',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: 600,
    },
    serviceInfo: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    serviceInfoTitle: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    serviceInfoText: {
      fontSize: '1.1rem',
      color: '#666',
      textAlign: 'center' as const,
      marginBottom: '40px',
      lineHeight: 1.6,
    },
    serviceFeatures: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '40px',
    },
    feature: {
      background: 'rgba(255, 255, 255, 0.7)',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
    },
    featureTitle: {
      fontSize: '1.5rem',
      color: '#4682B4',
      marginBottom: '15px',
      fontWeight: 600,
    },
    featureText: {
      color: '#666',
      lineHeight: 1.6,
    },
  };

  return (
    <div style={serviceStyles.service}>
      <Navigation />
      <div style={serviceStyles.serviceContent}>
        <h1 style={serviceStyles.serviceTitle}>서비스 안내</h1>
        <div style={serviceStyles.serviceInfo}>
          <h2 style={serviceStyles.serviceInfoTitle}>Dotbom 서비스 소개</h2>
          <p style={serviceStyles.serviceInfoText}>Dotbom은 가독성 향상과 훈련 게임을 통해 사용자에게 더 나은 경험을 제공합니다.</p>
          
          <div style={serviceStyles.serviceFeatures}>
            <div style={serviceStyles.feature}>
              <h3 style={serviceStyles.featureTitle}>가독성 향상 뷰어</h3>
              <p style={serviceStyles.featureText}>텍스트의 가독성을 향상시키는 도구를 제공합니다.</p>
            </div>
            <div style={serviceStyles.feature}>
              <h3 style={serviceStyles.featureTitle}>훈련 게임</h3>
              <p style={serviceStyles.featureText}>재미있는 게임을 통해 능력을 향상시킬 수 있습니다.</p>
            </div>
            <div style={serviceStyles.feature}>
              <h3 style={serviceStyles.featureTitle}>사용자 맞춤 설정</h3>
              <p style={serviceStyles.featureText}>개인에 맞는 설정을 통해 최적화된 경험을 제공합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service; 