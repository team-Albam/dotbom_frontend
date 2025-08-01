import React from 'react';
import Navigation from '../components/Navigation';

const Viewer: React.FC = () => {
  const viewerStyles = {
    viewer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%)',
      paddingTop: '70px',
    },
    viewerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    viewerTitle: {
      fontSize: '2.5rem',
      color: '#333',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: 600,
    },
    viewerTools: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      marginTop: '40px',
    },
    toolSection: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    toolTitle: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '20px',
      fontWeight: 600,
    },
    textInput: {
      width: '100%',
      minHeight: '200px',
      padding: '15px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      fontSize: '16px',
      fontFamily: 'Arial, sans-serif',
      resize: 'vertical' as const,
      background: 'white',
    },
    enhanceBtn: {
      background: 'linear-gradient(135deg, #4682B4, #87CEEB)',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'transform 0.3s ease',
    },
    enhancedTextDisplay: {
      background: 'white',
      border: '2px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      minHeight: '200px',
      fontSize: '16px',
      lineHeight: 1.6,
      color: '#333',
    },
  };

  return (
    <div style={viewerStyles.viewer}>
      <Navigation />
      <div style={viewerStyles.viewerContent}>
        <h1 style={viewerStyles.viewerTitle}>가독성 향상 뷰어</h1>
        <div style={viewerStyles.viewerTools}>
          <div style={viewerStyles.toolSection}>
            <h2 style={viewerStyles.toolTitle}>텍스트 입력</h2>
            <textarea 
              placeholder="가독성을 향상시킬 텍스트를 입력하세요..."
              style={viewerStyles.textInput}
            />
            <button style={viewerStyles.enhanceBtn}>가독성 향상</button>
          </div>
          
          <div style={viewerStyles.toolSection}>
            <h2 style={viewerStyles.toolTitle}>향상된 텍스트</h2>
            <div style={viewerStyles.enhancedTextDisplay}>
              <p>텍스트를 입력하고 가독성 향상 버튼을 클릭하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer; 