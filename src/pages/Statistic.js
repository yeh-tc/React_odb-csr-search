import RenderStatistic from "../components/RenderStatistic";
import Box from "@mui/material/Box";

export default function Statistic(){
    return(
      <>
        <Box
          sx={{
            width: "100%",
          }}
        >
        <RenderStatistic/>
        </Box>
      </>
    );
}