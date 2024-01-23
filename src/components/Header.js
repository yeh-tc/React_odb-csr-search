import Box from '@mui/material/Box';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SearchIcon from "@mui/icons-material/Search";
import ODBlogo from "../assets/ODB.png";

export default function Header(){
    return(
        <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100vw",
          zIndex: 99995,
          p: 1,
          borderBottom: "1px solid",
          borderColor: "#E4E4E4",
        }}
      >
        <Box sx={{
          display: "flex", 
          gap: 1, 
          alignItems: "center",
          maxWidth:'1400px',
          margin:'0 auto',
          px: { sm: 2, lg: 3 } }}>
          <Avatar alt="Logo" src={ODBlogo} />
          <Button
            size="sm"
            variant="outlined"
            startDecorator={<SearchIcon />}
            sx={{
              color: "#534D59",
              border: "2px solid #2789E3",
              backgroundColor: "#F9FAFC",
              pointerEvents: "none",
            }}
          >
            <span>CSR Search...</span>
            <span style={{ color: "#2789E3" }}>|</span>
          </Button>
        </Box>
      </Box>
    );
}