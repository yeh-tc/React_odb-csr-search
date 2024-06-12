import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

export default function Footer(){
    const year = new Date().getUTCFullYear();
    
    return(
      <>
        <Box
        sx={{
          py:1.5,
          borderBottom: "1px solid",
          borderColor: "#E4E4E4",
          backgroundColor:'#fafafa',
          width: '100%',
        }}
      >
         <Box sx={{
          display: "flex",
          flexDirection:'column', 
          gap: 1, 
          alignItems: "start",
          maxWidth:'1400px',
          margin:'0 auto',
          px: {  xs: 2, md: 6 } }}>
          
         
            <Typography sx={{
              color:'#2789E3',
              fontSize:'22px',
              fontFamily:"'Poppins'",
              fontWeight:500,
              marginBottom:'20px',
              paddingTop:'20px',
              lineHeight:1,
              textTransform:'uppercase'
            }}>ODB<br/><span style={{ color:'#003566',
            fontSize:'20px',}}>CSR SEARCH</span></Typography>

            <Typography sx={{
              fontSize:'14px',
              lineHeight:'24px',
              marginBottom:'20px',
              letterSpacing:'0.5px',
              fontFamily:"'Noto Sans TC'"}}>
                國立臺灣大學海洋研究所<br/>
                    10617 臺北市大安區羅斯福路四段一號<br/><br/>
                    電話: +886-2-2363-6450#117<br/>
                    Email: yehtc@ntu.edu.tw<br/></Typography>
        </Box>
  
      </Box>
              <Box sx={{backgroundColor:'#FFFFFF',py:'10px',textAlign:'center',fontFamily:"'Poppins'"}}>
              <Typography variant="caption">Copyright ©{year} 海洋學門資料庫-Ocean Data Bank (ODB). All Rights Reserved</Typography>
              </Box>    
              </>
    );
}