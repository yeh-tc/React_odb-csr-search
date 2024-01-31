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
           px: { xs: 2, md: 6},
           py:4
           }}>
            {children}
        </Box>
    );
}