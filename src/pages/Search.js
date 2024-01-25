
import  Box  from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import QueryForm from "../components/QueryForm";
import CruiseTable from "../components/CruiseTable";
export default function Search() {
  return (
    <><Box 
        sx={{
            width:"100%",
            }}>
      <Stack 
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" sx={{ fontWeight: 500, color:'##71A1C' }}>
          查詢探測報告
        </Typography>
        <Button
          startIcon={<DownloadRoundedIcon />}
          size="small"
          variant="outlined"
          sx={{
            color:'#2789E3',
          }}
        >
          下載 csv
        </Button>
      </Stack>
      <QueryForm/>
      <CruiseTable/>
      </Box>
    </>
  );
}
