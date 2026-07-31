import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#72B5E8',
      light: '#A6D2F2',
      dark: '#4A90C9',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#F7F9FB',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },

    success: {
      main: '#2E7D32',
    },

    warning: {
      main: '#ED6C02',
    },

    error: {
      main: '#D32F2F',
    },

    info: {
      main: '#0288D1',
    },
  },

  typography: {
    fontFamily: '"Manrope", sans-serif',

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 600,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,.08)',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});