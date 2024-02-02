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

export default function CruiseEquiTable({ data }) {
  return (
    <>
      <Paper sx={{ width: "100%", mb: 2, mt: 5 }} elevation={1}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: "#003566", px: 2, py: 2 }}
        >
          沿航線資料
        </Typography>
        <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 200 }}>沿航線資料</TableCell>
                <TableCell align="center">採集樣品</TableCell>
                <TableCell align="center">樣品持有人</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.Item.map((item, index) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#474747" }}
                  >
                    {item}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#474747" }}>
                    {item === "都普勒流剖儀ADCP 75-kHz"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "單音束測深儀EK-80"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "單音束測深儀EA-640"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "多音束測深儀EM2040"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "多音束測深儀EM304"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "多音束測深儀"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "船艏氣象儀"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "都普勒流剖儀ADCP 150-kHz"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "底質剖面儀Edgetech3300"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "X波段雷達波浪儀"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "多音束測深儀EM712"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "底質剖面儀Bathy2000"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "單音束測深儀EK-500,GPS"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "都普勒流剖儀ADCP"
                      ? data.CollectionNum[index] + " 浬"
                      : item === "掃描式聲納"
                      ? data.CollectionNum[index] + " 站"
                      : item === "航行紀錄資料"
                      ? data.CollectionNum[index] + " 時"
                      : data.CollectionNum[index]}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#474747" }}>
                    {data.CollectionOwner[index]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {data.Item.map((item, index) => (
            <List sx={{ width: "100%" }}>
              <ListItem
                sx={{
                  display: "flex",                  
                  flexDirection:{xs:'column',sm:'row'},
                  justifyContent: {xs:'start',sm:'space-between'},
                  alignItems: "start",
                }}
              >
                <div>
                  <Typography fontWeight={600} gutterBottom>
                    {item}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#474747", fontWeight: 400 }}
                    >
                      採集樣品
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: "#474747" }}>
                      &bull;
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#474747", fontWeight: 500 }}
                    >
                      {item === "都普勒流剖儀ADCP 75-kHz"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "單音束測深儀EK-80"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "單音束測深儀EA-640"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "多音束測深儀EM2040"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "多音束測深儀EM304"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "多音束測深儀"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "船艏氣象儀"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "都普勒流剖儀ADCP 150-kHz"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "底質剖面儀Edgetech3300"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "X波段雷達波浪儀"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "多音束測深儀EM712"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "底質剖面儀Bathy2000"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "單音束測深儀EK-500,GPS"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "都普勒流剖儀ADCP"
                        ? data.CollectionNum[index] + " 浬"
                        : item === "掃描式聲納"
                        ? data.CollectionNum[index] + " 站"
                        : item === "航行紀錄資料"
                        ? data.CollectionNum[index] + " 時"
                        : data.CollectionNum[index]}
                    </Typography>
                  </Box>
                </div>
                <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#474747", fontWeight: 400 }}
                    >
                      樣品持有人
                    </Typography>
                    <Typography variant="subtitle2">&bull;</Typography>
                    <Chip
                      size="small"
                      icon={<FaceIcon />}
                      sx={{
                        color: "#474747",
                        backgroundColor: "rgba(219, 235, 250,0.7)",
                      }}
                      label={data.CollectionOwner[index]}
                    />
                  </Box>
              </ListItem>
              {index < data.Item.length - 1 && (
                <Divider variant="middle" component="li" />
              )}
            </List>
          ))}
        </Box>
      </Paper>
    </>
  );
}
