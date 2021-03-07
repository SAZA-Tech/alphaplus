import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0081A7',
    },
    secondary: {
      main: '#FED9B7',
    },
    success:{
        main:'#00AFB9'
    }
  },
});