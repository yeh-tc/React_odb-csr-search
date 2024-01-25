import Box from "@mui/material/Box";
export default function Body({children}){
    return(
        <Box sx={{
            display:'flex',
            margin: "0 auto",
            mt: {
             xs: '59px',
             sm: '59px',
             md: '59px',
           },
           maxWidth:'1400px',
           px: { xs:2, sm: 2.5,md:3, lg: 3.5 },
           py:4
           }}>
            {children}
        </Box>
    );
}