import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function AppendTable({ title, data }) {
  return (
    <Paper sx={{ width: "100%", mb: 2, mt: 5 }} elevation={1}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          color: "#003566",
          px: 2,
          py: 2,
        }}
      >
        {title}
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>作業項目</TableCell>
              <TableCell align="center">採集樣品</TableCell>
              <TableCell sx={{ width: 300 }} align="center">
                樣品持有人
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Equipment.map((item, index) => (
              <TableRow
                key={item}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" sx={{ color: "#474747" }}>
                  {item}
                </TableCell>
                {title === '其他作業' ?
                (<TableCell align="center" sx={{ color: "#474747" }}>{data.Summary1[index]} {data.Summary2[index]}</TableCell>) 
                :
                (<TableCell align="center" sx={{ color: "#474747" }}>
                {
                item === "CTD" ||
                item === "TM-CTD" ||
                item === "Seaglider" ||
                item === "EM-APEX float" ||
                item === "Plankton net" ||
                item === "Sediment Trap" ||
                item === "Water sampling (bottle)" ||
                item === "Big trawling" ||
                item === "Trawling" ||
                item === "Lander" ||
                item === "Multi-core" ||
                item === "Box-core" ||
                item === "Piston-core" ||
                item === "Dredge" ||
                item === "Gravity-core" ||
                item === "Smith-core" ||
                item === "Reflection profiling" ||
                item === "LADCP" ||
                item === "Towed instrument" ||
                item === "Turbulence profiling (VMP250)" ||
                item === "Turbulence profiling (VMP500)" ||
                item === "UCTD" ||
                item === "Sonde" ||
                item === "Drifter" ||
                item === "Shipek Grab" ||
                item === "Bottom trawling" ||
                item === "XBT" ||
                item === "拋棄式溫深儀(XBT)" ||
                item === "自記式紊流量測模組(Microrider)"
                
                  ? `${data.Summary1[index]} 站 ${data.Summary2[index]} 次`
                  : item === "Mooring" && data.Summary2[index] === ""
                  ? `${data.Summary1[index]} 站`
                  : item === "Side scan (towed)"  && data.Summary2[index] === ""
                  ? `${data.Summary1[index]} 海浬`
                  : item === "Side scan (towed)"  && data.Summary2[index] !== ""
                  ? `${data.Summary1[index]} 站 ${data.Summary2[index]} 次`
                  : item === "LiDAR"
                  ? `${data.Summary1[index]} 海浬`
                  : `${data.Summary1[index]} ${data.Summary2[index]}`}
                </TableCell>)
                }
                

                <TableCell align="center" sx={{ color: "#474747" }}>
                  {data.DataOwner[index]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
