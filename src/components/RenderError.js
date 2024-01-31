import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';

export default function RenderError(){
    return(
        
        <Stack
        spacing={4}
        sx={{
          display: "flex",
          mx: "auto",
          maxWidth: "800px",
          px: { xs: 2, md: 6 },
          py: { xs: 2, sm: 4, md: 5 },
        }}
      >
      <Paper variant="outlined" sx={{ backgroundColor: "#F8FaFC" }}>
          <Box sx={{ mb: 1, px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "#2789E3" }}>
              航次資訊
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              mb: 1,
              px: 2,
              py: 2,
            }}
          >
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
      </Paper>
      <Paper variant="outlined" sx={{ backgroundColor: "#F8FaFC" }}>
          <Box sx={{ mb: 1, px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "#2789E3" }}>
              參與人員
            </Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              mb: 1,
              px: 2,
              py: 2,
            }}>
          <Skeleton />
            <Skeleton />

          </Box>
      </Paper>
      <Paper variant="outlined" sx={{ backgroundColor: "#F8FaFC" }}>
          <Box sx={{ mb: 1, px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "#2789E3" }}>
              作業項目
            </Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              mb: 1,
              px: 2,
              py: 2,
            }}>
          <Skeleton />
            <Skeleton />

          </Box>
      </Paper>
    </Stack>
    
    );
}