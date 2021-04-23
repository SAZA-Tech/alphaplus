import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3D5267',
      dark: '#2A3948',
      light: '#637485',
    },
    secondary: {
      main: '#FF505F',
      dark: '#B23842',
      light: '#FF505F',
    },
    action: {
      main: '#E0E0E0',
    },
    info: {
      main: '#2196F3',
      dark: '#0B79D0',
      light: '#64B6F7',
    },
    error:{
      main:'#F44336',
      dark:'#E31B0C',
      light:'#F88078',
    },
    warning:{
      main:'#FF9800',
      dark:'#C77700',
      light:'#FFB547'
    },
    success: {
      main: '#4CAF50',
      dark:'#3B873E',
      light:'#7BC67E',
    },
    background: {
      default: "#E5E5E5"
    }

  },
});