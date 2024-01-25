import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider,} from "react-router-dom";

import Home from './pages/Home';
import Info from './pages/Info';
import Search from './pages/Search';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Search />,
      },
      {
        path: "csr/:csrId",
        element: <Info />,
      },
    ],
  },
]);


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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
