import { Platform } from 'react-native';

console.log(Platform.OS);
const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    pageBackgroundColor: '#e1e4e8',
    appBarBackgroundColor: '#24292e',
    primaryButtonBackgroundColor: '#0366d6'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: Platform.select({
    ios: 'Arial',
    android: 'Roboto',
    default: 'System',
  }),
  // fonts: {
    // main: 'System',
  // },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
