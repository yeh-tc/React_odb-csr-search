import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import FaceIcon from "@mui/icons-material/Face";


export default function AppendTable({ title, data }) {
  const renderSummary = (item, index) => {
    const isNumericSummary2 = !isNaN(+data.Summary2[index])&& data.Summary2[index].trim().length > 0;
    const isNumericSummary1 = !isNaN(+data.Summary1[index])&& data.Summary1[index].trim().length > 0;
    if (isNumericSummary1 && isNumericSummary2){
      return `${data.Summary1[index]} 站 ${data.Summary2[index]} 次`;
    }
    else if(!isNumericSummary1 && isNumericSummary2){
      return `${data.Summary2[index]} 次`;
    }
    else if(isNumericSummary1 && !isNumericSummary2 && data.Summary2[index]==='浬'){
      return `${data.Summary1[index]} 浬`;
    }
    else if(isNumericSummary1 && !isNumericSummary2 && data.Summary2[index]==='站'){
      return `${data.Summary1[index]} 站`;
    }
    else if(isNumericSummary1 && data.Summary2[index]===""){
      return `${data.Summary1[index]} 站`;
    }
    else if (title === "其他作業") {
      return `${data.Summary1[index]} ${data.Summary2[index]}`;
    } else if (data.Summary2[index] === "站") {
      return `${data.Summary1[index]} ${data.Summary2[index]}`;
    } else if (data.Summary1[index] === undefined) {
      return ``;
    }else {
      const specialEquipment = [
        "CTD", "TM-CTD", "Seaglider", "EM-APEX float", "Plankton net",
        "Sediment Trap", "Water sampling (bottle)", "Big trawling", "Trawling",
        "Lander", "Multi-core", "Box-core", "Piston-core", "Dredge",
        "Gravity-core", "Smith-core", "Reflection profiling", "LADCP",
        "Towed instrument", "Turbulence profiling (VMP250)", "Turbulence profiling (VMP500)",
        "UCTD", "Sonde", "Drifter", "Shipek Grab", "Bottom trawling", "XBT",
        "拋棄式溫深儀(XBT)", "自記式紊流量測模組(Microrider)"
      ];
      
      if (specialEquipment.includes(item) ) {
        return `${data.Summary1[index]} 站 ${data.Summary2[index]} 次`;
      } else if (item === "Mooring" && data.Summary2[index] === "") {
        return `${data.Summary1[index]} 站`;
      } else if (item.includes("Side scan (towed)") && data.Summary2[index] === "") {
        return `${data.Summary1[index]} 海浬`;
      } else if (item === "LiDAR" && data.Summary2[index] === "") {
        return `${data.Summary1[index]} 海浬`;
      } else {
        return `${data.Summary1[index]} ${data.Summary2[index]}`;
      }
    }
  };
 
  return (
    <>
      <Paper sx={{ width: "100%", mb: 2, mt: 5 }} elevation={1}>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#003566", px: 2, py: 2 }}>
          {title}
          
        </Typography>
        <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
          <Table  sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 200 }}>作業項目</TableCell>
                <TableCell align="center">採集樣品</TableCell>
                <TableCell align="center">樣品持有人</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.Equipment.map((item, index) => (
                <TableRow key={item + index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ color: "#474747", whiteSpace: "wrap" }}>
                    {item}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#474747" }}>
                    {renderSummary(item, index)}
                  </TableCell>
                  <TableCell align="center" sx={{ width:300,color: "#474747" }}>
                    
                    {data.DataOwner[index] !== "" &&
                    <Box sx={{display:'flex',flexWrap:'wrap',gap:1, justifyContent:'center'}}>
                     {data.DataOwner[index].split("、").map((owner, ownerIndex)=>(
                     <Chip
                      key={owner + '-' + ownerIndex}
                      icon={<FaceIcon />}
                      size="small"
                      label={owner}
                      sx={{
                        color: "#474747",
                        backgroundColor: "rgba(219, 235, 250,0.7)",
                      }}
                      />))
                    }
                    </Box>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {data.Equipment.map((item, index) => (
            <List sx={{ width: "100%" }} key={item + '-list-' + index}>
              <ListItem sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { xs: 'start', sm: 'space-between' }, alignItems: "start" }}>
                <div>
                  <Typography sx={{ fontWeight: 500 }} gutterBottom>
                    {item}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "start", gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: "#474747", fontWeight: 400 }}>採集樣品</Typography>
                    <Typography variant="subtitle2" sx={{ color: "#474747" }}>&bull;</Typography>
                    <Typography variant="subtitle2" sx={{ color: "#474747", fontWeight: 500 }}>
                      {renderSummary(item, index)}
                    </Typography>
                  </Box>
                </div>
                {data.DataOwner[index] && (
                  <Box sx={{ display: "flex", alignItems: {xs:'start',sm:"center"}, justifyContent: "start", gap: 1, mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: "#474747", fontWeight: 400, whiteSpace: "nowrap" }}>樣品持有人</Typography>
                    <Typography variant="subtitle2">&bull;</Typography>
                    <Box sx={{ display:'flex', flexDirection:{xs: 'row', sm: 'column'}, flexWrap: 'wrap', gap: 1 }}>
                    {data.DataOwner[index].split("、").map((owner, ownerIndex)=>(
                    <Chip key={owner + '-' + ownerIndex} icon={<FaceIcon />} size="small" label={owner} sx={{ color: "#474747", backgroundColor: "rgba(219, 235, 250,0.7)" }} />))}
                    
                    </Box>
                  </Box>
                )}
              </ListItem>
              {index < data.Equipment.length - 1 && <Divider variant="middle" component="li" />}
            </List>
          ))}
        </Box>
      </Paper>
    </>
  );
}