import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useSettings } from '../contexts/SettingsContext';

const getFontSize = (size: string) => {
  switch (size) {
    case 'small': return '14px';
    case 'large': return '18px';
    default: return '16px';
  }
};

const getTextColor = (color: string) => {
  switch (color) {
    case 'blue': return '#2196F3';
    case 'green': return '#4CAF50';
    case 'red': return '#F44336';
    case 'yellow': return '#FFC107';
    default: return '#333';
  }
};

const getLetterSpacing = (spacing: string) => {
  switch (spacing) {
    case 'tight': return '-0.5px';
    case 'wide': return '1px';
    default: return 'normal';
  }
};

const getTextWidth = (width: string) => {
  switch (width) {
    case 'narrow': return '60ch';
    case 'wide': return '80ch';
    default: return '70ch';
  }
};

const GlobalStyles = createGlobalStyle<{ settings: any }>`
  /* 스크롤바 숨김 */
  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  
  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  html, body {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none;
  }

  body {
    font-size: ${props => getFontSize(props.settings.fontSize)};
    color: ${props => getTextColor(props.settings.textColor)};
    letter-spacing: ${props => getLetterSpacing(props.settings.letterSpacing)};
    line-height: 1.6;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
  }

  p, h1, h2, h3, h4, h5, h6 {
    max-width: ${props => getTextWidth(props.settings.textWidth)};
    margin-left: auto;
    margin-right: auto;
  }

  .content-text {
    font-size: ${props => getFontSize(props.settings.fontSize)};
    color: ${props => getTextColor(props.settings.textColor)};
    letter-spacing: ${props => getLetterSpacing(props.settings.letterSpacing)};
    max-width: ${props => getTextWidth(props.settings.textWidth)};
  }
`;

const GlobalStylesWrapper: React.FC = () => {
  const { settings } = useSettings();
  
  return <GlobalStyles settings={settings} />;
};

export default GlobalStylesWrapper; 