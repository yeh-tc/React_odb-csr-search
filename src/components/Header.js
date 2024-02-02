import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ODBlogo from "../assets/ODB.png";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100vw",
          py:1.5,
          borderBottom: "1px solid",
          borderColor: "#E4E4E4",
          backgroundColor:'#FFFFFF',
          zIndex:9999
        }}
      >
        <Box sx={{
          display: "flex", 
          gap: 1, 
          alignItems: "center",
          justifyContent:"space-between",
          maxWidth:'1400px',
          margin:'0 auto',
          px: { xs: 2, md: 6  } }}>
            
          <a href='https://www.odb.ntu.edu.tw/' target="_blank"><Avatar alt="Logo" src={ODBlogo} sx={{ width: 34, height: 34 }}/></a>
          
          <Link to={`/`}>
          <IconButton aria-label="delete" sx={{color:'#2789E3'}}>
          
             <HomeRoundedIcon />
          
          </IconButton>
          </Link>
        </Box>
      </Box>
    );
}