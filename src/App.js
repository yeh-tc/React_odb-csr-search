import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';
import Info from './pages/Info';
import Search from './pages/Search';

const queryClient = new QueryClient();
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
      {
        path: "*", 
        element: <Navigate to="/" replace /> 
      }
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
  palette: {
    primary: {

      main: '#2789E3',
    },

  },
  

});
theme = responsiveFontSizes(theme);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
