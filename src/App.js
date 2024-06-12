import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import Home from './pages/Home';
import Info from './pages/Info';
import Search from './pages/Search';
import Statistic from './pages/Statistic';

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
        path: "data",
        element: <Statistic />,
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
    secondary: {
      main: '#757575',
    },
    Info: {
      main: '#fd9602',
    },
    success: {
      main: '#EF86F2',
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
