import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function AppendTable({title, data}){
    return(
        <Paper sx={{ width: "100%", mb: 2,mt:5}} elevation={1}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, color: "#474747",px:2,py:2 }}
                >
                  {title}
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell >儀器</TableCell>
                        <TableCell align="center">單位1</TableCell>
                        <TableCell align="center">單位2</TableCell>
                        <TableCell sx={{ width: 300}} align="center">樣品持有人</TableCell>
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
                          <TableCell component="th" scope="row" sx={{color: "#474747"}}>
                            {item}
                          </TableCell>
                          <TableCell align="center" sx={{color: "#474747"}}>
                            {item==='CTD' ? data.Summary1[index]+'站' : data.Summary1[index]}
                          </TableCell>
                          <TableCell align="center" sx={{color: "#474747"}}>
                          {item==='CTD' ? data.Summary2[index]+'次' : data.Summary2[index]}
                          </TableCell>
                          <TableCell align="center" sx={{color: "#474747"}}>
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