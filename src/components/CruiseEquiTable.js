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
  // Helper function to format the collection number with units
  const formatCollectionNum = (item, index) => {
    const units = [
      "都普勒流剖儀ADCP 75-kHz",
      "單音束測深儀EK-80",
      "單音束測深儀EK-80,GPS",
      "單音束測深儀EA-640",
      "單音束測深儀EA-640,GPS",
      "單音束測深儀EK-60,GPS",
      "單音束測深儀EK-500,GPS",
      "多音束測深儀EM2040",
      "多音束測深儀EM304",
      "多音束測深儀",
      "船艏氣象儀",
      "都普勒流剖儀ADCP 150-kHz",
      "底質剖面儀Edgetech3300",
      "底質剖面儀Bathy2000",
      "底質剖面儀Bathy2010",
      "底質剖面儀",
      "X波段雷達波浪儀",
      "多音束測深儀EM712",
      "都普勒流剖儀ADCP",
      "拖曳水下聲納載台"
    ].includes(item)
      ? " 浬"
      : item === "掃描式聲納" || item === "水下遙控載具(ROV)" || item === "拖曳式水下攝影系統(Tow Cam)" ||
        item === "深海拖曳式光纖探測系統(FITS)" || item === "深海拖曳式攝影系統(ATIS)" || item === "自主水下載具(AUV)" || item === "超短基線(USBL)" || item === "漂浮式載台"
      ? " 站"
      : item === "航行紀錄資料"
      ? " 時"
      : "";
    return data.CollectionNum[index] + units;
  };

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
                  key={item + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: "#474747", whiteSpace: "wrap" }}
                    
                  >
                    {item}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#474747" }}>
                    {data.CollectionNum[index] &&
                    formatCollectionNum(item, index)}
                  </TableCell>
                  <TableCell align="center" sx={{ width:300, color: "#474747" }}>
                  {data.CollectionOwner[index] !== "" &&
                    <Box sx={{display:'flex',flexWrap:'wrap',gap:1, justifyContent:'center'}}>
                     {data.CollectionOwner[index].split("、").map((owner, ownerIndex)=>(
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
          {data.Item.map((item, index) => (
            <List sx={{ width: "100%" }} key={item + "-list-" + index}>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "start", sm: "space-between" },
                  alignItems: "start",
                }}
              >
                <div>
                  <Typography sx={{ fontWeight: 500 }} gutterBottom>
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
                      sx={{ color: "#474747", fontWeight: 500}}
                    >
                      {formatCollectionNum(item, index)}
                    </Typography>
                  </Box>
                </div>
                {data.CollectionOwner[index] && (
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
                      sx={{ color: "#474747", fontWeight: 400, whiteSpace: "nowrap" }}
                    >
                      樣品持有人
                    </Typography>
                    <Typography variant="subtitle2">&bull;</Typography>
                    <Box sx={{ display:'flex', flexDirection:{xs: 'row', sm: 'column'}, flexWrap: 'wrap', gap: 1 }}>
                    {data.CollectionOwner[index].split("、").map((owner, ownerIndex)=>(
                    <Chip
                      key={owner + '-' + ownerIndex}
                      icon={<FaceIcon />}
                      size="small"
                      label={owner}
                      sx={{
                        color: "#474747",
                        backgroundColor: "rgba(219, 235, 250,0.7)",
                      }}
                    />))}
                    </Box>
                  </Box>
                )}
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
