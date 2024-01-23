import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Header from './components/Header';

let theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      '"Noto Sans TC"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
theme = responsiveFontSizes(theme);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header/>
      
    </ThemeProvider>
  );
}

export default App;
