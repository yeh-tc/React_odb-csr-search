import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CruiseInfo from "../components/CruiseInfo";
import RenderError from "../components/RenderError";

function splitCsrId(csrid) {
  // Regular expression to match the shipName patterns
  const shipNamePattern = /^(NOR1|NOR2|NOR3|OR1|OR2|OR3)/;
  const match = csrid.match(shipNamePattern);

  if (match) {
    const shipName = match[0];
    const cruiseID = csrid.slice(shipName.length); // Remaining string is cruiseID
    return { shipName, cruiseID };
  }

  // If no match found, return null or a default value
  return null;
}
export default function Info() {
  const { csrId } = useParams();
  const splitIds = splitCsrId(csrId);

if (splitIds) {
  const { shipName, cruiseID } = splitIds;
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CruiseInfo shipName={shipName} cruiseID={cruiseID}/>
    </Box>
  );

  // Use shipName and cruiseID as needed
} else {
  return(
  <Box sx={{
    width: "100%",
  }}>
  <Typography variant="h5" sx={{ fontWeight: 500, color: "#71A1C", mb: 2 }}>
    探測報告不存在於資料庫 (｡ŏ_ŏ)
  </Typography>
  <RenderError/>
</Box>
  );
}
  
}
