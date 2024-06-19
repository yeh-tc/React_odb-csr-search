import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import ODBlogo from "../assets/ODB.png";
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useLocation, Link } from 'react-router-dom';

export default function Header(){
  const location = useLocation();
    return(
        <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          py:1,
          borderBottom: "1px solid",
          borderColor: "#E4E4E4",
          backgroundColor:'#FFFFFF',
          zIndex:9999
        }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          maxWidth:'1400px',
          margin:'0 auto',
          px: { xs: 2, md: 6} }}>
            
          <a href='https://www.odb.ntu.edu.tw/' target="_blank" rel="noreferrer"><Avatar alt="Logo" src={ODBlogo} sx={{ width: 34, height: 34 }}/></a>
          <Stack  direction="row" spacing={1} alignItems="center">
            <Link to={`/`}>
              <Tooltip title="首頁">  
                <IconButton aria-label="home" sx={{color:location.pathname === '/' ? '#2789E3' : '#75B7F5', ":hover":{color:'#2789E3'}}}>
                  <HomeRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={`data/`}>
              <Tooltip title="統計資料">  
                <IconButton aria-label="data" sx={{color:location.pathname === '/data/' ? '#2789E3' : '#75B7F5', ":hover":{color:'#2789E3'}}}>
                  <BarChartIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
        </Box>
      </Box>
    );
}