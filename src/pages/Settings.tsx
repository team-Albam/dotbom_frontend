import React from 'react';
import Navigation from '../components/Navigation';

const Settings: React.FC = () => {
  const settingsStyles = {
    settings: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 25%, #FFFFFF 50%, #F0F8FF 75%, #E6E6FA 100%)',
      paddingTop: '70px',
    },
    settingsContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    settingsTitle: {
      fontSize: '2.5rem',
      color: '#333',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: 600,
    },
    settingsSection: {
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    settingsSectionTitle: {
      fontSize: '2rem',
      color: '#333',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontWeight: 600,
    },
    settingOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      marginBottom: '40px',
    },
    settingOption: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px',
    },
    settingLabel: {
      fontSize: '1.1rem',
      color: '#333',
      fontWeight: 600,
    },
    settingSelect: {
      padding: '10px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      background: 'white',
    },
    settingCheckbox: {
      width: '20px',
      height: '20px',
      marginTop: '5px',
    },
    saveBtn: {
      background: 'linear-gradient(135deg, #4682B4, #87CEEB)',
      color: 'white',
      border: 'none',
      padding: '15px 40px',
      borderRadius: '25px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      display: 'block',
      margin: '0 auto',
    },
  };

  return (
    <div style={settingsStyles.settings}>
      <Navigation />
      <div style={settingsStyles.settingsContent}>
        <h1 style={settingsStyles.settingsTitle}>사용자 맞춤 설정</h1>
        <div style={settingsStyles.settingsSection}>
          <h2 style={settingsStyles.settingsSectionTitle}>개인 설정</h2>
          <div style={settingsStyles.settingOptions}>
            <div style={settingsStyles.settingOption}>
              <label style={settingsStyles.settingLabel}>폰트 크기</label>
              <select style={settingsStyles.settingSelect}>
                <option value="small">작게</option>
                <option value="medium" selected>보통</option>
                <option value="large">크게</option>
              </select>
            </div>
            
            <div style={settingsStyles.settingOption}>
              <label style={settingsStyles.settingLabel}>테마 색상</label>
              <select style={settingsStyles.settingSelect}>
                <option value="light" selected>밝은 테마</option>
                <option value="dark">어두운 테마</option>
                <option value="auto">자동</option>
              </select>
            </div>
            
            <div style={settingsStyles.settingOption}>
              <label style={settingsStyles.settingLabel}>읽기 속도</label>
              <select style={settingsStyles.settingSelect}>
                <option value="slow">느리게</option>
                <option value="normal" selected>보통</option>
                <option value="fast">빠르게</option>
              </select>
            </div>
            
            <div style={settingsStyles.settingOption}>
              <label style={settingsStyles.settingLabel}>알림 설정</label>
              <input type="checkbox" style={settingsStyles.settingCheckbox} />
            </div>
          </div>
          
          <button style={settingsStyles.saveBtn}>설정 저장</button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 