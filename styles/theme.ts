import { createTheme } from '@mui/material/styles';

// Import the Jost font
import '@fontsource/jost/index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff681a',
    },
    secondary: {
      main: '#42eff5',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Jost", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.5,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.8rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 400,
      fontSize: '1.2rem',
      lineHeight: 1.1,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
});

export default theme;
