import React from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AppendTable from "./AppendTable";
import RenderError from "./RenderError";
import CruiseEquiTable from "./CruiseEquiTable";
import Avatar from "@mui/material/Avatar";
import InfoForm from "./InfoForm";


import NTUlogo from "../assets/NTU.gif";
import SYUlogo from "../assets/SYU.png";
import NKUSTlogo from "../assets/NKUST.png";
import NKNUlogo from "../assets/NKNU.png";
import marinelogo from "../assets/marine.png";
import NTOUlogo from "../assets/ntoulogo.gif";
import Sinicalogo from "../assets/sinica.png";
import NCKUlogo from "../assets/ncku.png";
import NTNUlogo from "../assets/NTNU.png";
import NAMRlogo from "../assets/NAMR.svg"
import DWUlogo from "../assets/DWU.jpg"
import NTUElogo from "../assets/NTUE.png"
import cwalogo from "../assets/cwa.svg"
import MElogo from "../assets/ME.png"



function formatDateAndTime(isoDateString) {
  if (!isoDateString) return "";
  const date = new Date(isoDateString);
  return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")} ${date
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`;
}

const useCruiseInfo = (shipName, cruiseID) => {
  return useQuery(["cruiseInfo", shipName, cruiseID], async () => {
    const response = await fetch(
      `https://api.odb.ntu.edu.tw/cruise/csrqry/${shipName}/${cruiseID}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export default function CruiseInfo({ shipName, cruiseID }) {
  const {
    data: cruiseData,
    isLoading,
    isError,
  } = useCruiseInfo(shipName, cruiseID);
  
  if (isLoading) {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 500, color: "#474747", mb: 2 }}>
          Loading...
        </Typography>
        <RenderError progess/>
    </Box>);
  }

  if (isError || cruiseData.length === 0) {
    return (
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 500, color: "#474747", mb: 2 }}>
          探測報告不存在於資料庫 (｡ŏ_ŏ)
        </Typography>
        <RenderError/>
      </Box>
    );
  }

  // Render the actual content if data is available...

 
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 500, color: "##71A1C" }}>
        探測報告表
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 400, color: "#474747" }}
      >
        (以下資料為人工謄填，僅供參考，正確內容請以各船務室書面正本為主)
      </Typography>
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
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
              }}
            >
              <InfoForm
                text={"航次代號"}
                info={
                  cruiseData[0].CruiseBasicData.ShipName +
                  cruiseData[0].CruiseBasicData.CruiseID
                }
              />
              <InfoForm
                text={"領隊教授"}
                info={cruiseData[0].CruiseBasicData.LeaderName}
              />
              
            </Box>
            <InfoForm
                text={"探測海域"}
                info={cruiseData[0].CruiseBasicData.ExploreOcean}
                sx={{ flexBasis: { sm: "100%", md: 0, lg: 0 } }}
              />
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", sm: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <InfoForm
                  text={"航行浬程 (海浬)"}
                  info={cruiseData[0].CruiseBasicData.TotalDistance}
                />
                <InfoForm
                  text={"航行天數"}
                  info={cruiseData[0].CruiseBasicData.DurationDays}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <InfoForm
                  text={"航行時數"}
                  info={cruiseData[0].CruiseBasicData.DurationHours}
                />
                <InfoForm
                  text={"離岸最遠 (海浬)"}
                  info={cruiseData[0].CruiseBasicData.FarestDistance}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <InfoForm
                text={"出港日期 (UTC+8)"}
                info={formatDateAndTime(
                  cruiseData[0].CruiseBasicData.StartDate
                )}
              />
              <InfoForm
                text={"出港港口"}
                info={cruiseData[0].CruiseBasicData.StartPort}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <InfoForm
                text={"進港日期 (UTC+8)"}
                info={formatDateAndTime(cruiseData[0].CruiseBasicData.EndDate)}
              />
              <InfoForm
                text={"進港港口"}
                info={cruiseData[0].CruiseBasicData.EndPort}
              />
            </Box>

              <InfoForm
                text={"計畫名稱"}
                info={cruiseData[0].CruiseBasicData.PlanName}
              />
              <InfoForm
                text={"探測人員"}
                info={cruiseData[0].CruiseBasicData.Technician}
              />
            
            <InfoForm
              text={"備註 (作業狀況說明及建議事項)"}
              info={cruiseData[0].CruiseBasicData.Remark}
            />
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ backgroundColor: "#F8FaFC" }}>
          <Box sx={{ mb: 1, px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "#2789E3" }}>
              參與人員
            </Typography>
          </Box>
          {cruiseData[0].Participants.Department.some(dept => dept.trim() !== '')  &&(
          <Box>
            
            <List>
              {cruiseData[0].Participants.Department.map(
                (department, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{ display: "flex", gap: 2, alignItems: "center" }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={department}
                          src={
                            department === "台大" ||
                            department === "臺大" ||
                            department === "台灣大學" ||
                            department === "國立臺灣大學"
                              ? NTUlogo
                              : department === "中山" ||
                                department === "中山大學" ||
                                department === "國立中山大學"
                              ? SYUlogo
                              : department === "高科大"
                              ? NKUSTlogo
                              : department === "高師大"
                              ? NKNUlogo
                              : department === "海軍官校" ||
                                department === "海軍軍官學校"
                              ? marinelogo
                              : department === "海大" ||
                                department === "海洋大學" ||
                                department === "國立臺灣海洋大學"
                              ? NTOUlogo
                              : department === "中研院" ||
                                department === "中央研究院"
                              ? Sinicalogo
                              : department === "成大" ||
                                department === "成功大學" ||
                                department === "國立成功大學"
                              ? NCKUlogo
                              : department === "師大" ||
                                department === "國立師範大學" ||
                                department === "師範大學" ||
                                department === "台師大"
                              ? NTNUlogo
                              : department === "國海院" ||
                                department === "國家海洋研究院"
                              ? NAMRlogo
                              : department === "東吳大學"||
                                department === "東吳"
                              ? DWUlogo
                              : department === "北教大"
                              ? NTUElogo
                              : department === "中央氣象局"
                              ? cwalogo
                              : department === "環保署" ||
                                department === "環境部"
                              ? MElogo
                              : undefined
                          }
                        >{department ? department.charAt(0) : "?"}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={department}
                        secondary={
                          <Typography
                            sx={{ display: "inline", color: "#474747" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {cruiseData[0].Participants.Name[index]}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index <
                      cruiseData[0].Participants.Department.length - 1 && (
                      <Divider variant="middle" component="li" />
                    )}
                  </React.Fragment>
                )
              )}
            </List>
          
          </Box>)
        }
        </Paper>
        <Paper variant="outlined" sx={{ backgroundColor: "#F8FaFC" }}>
          <Box sx={{ mb: 1, px: 2, py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500, color: "#2789E3" }}>
              作業項目
            </Typography>
            {cruiseData[0].CruiseData &&(
              <CruiseEquiTable data={cruiseData[0].CruiseData} />
            )}
            {cruiseData[0].Physical &&(
              <AppendTable title={'物理作業'} data={cruiseData[0].Physical}/>
            )}
            {cruiseData[0].Biogeochemical &&(
              <AppendTable title={'生地化作業'} data={cruiseData[0].Biogeochemical}/>
            )}
            {cruiseData[0].Biology &&(
              <AppendTable title={'生物作業'} data={cruiseData[0].Biology}/>
            )}
            {cruiseData[0].Geology &&(
              <AppendTable title={'地質作業'} data={cruiseData[0].Geology}/>
            )}
            {cruiseData[0].Geophysics &&(
              <AppendTable title={'地物作業'} data={cruiseData[0].Geophysics}/>
            )}
            {cruiseData[0].Atmospher &&(
              <AppendTable title={'大氣作業'} data={cruiseData[0].Atmospher}/>
            )}
            {cruiseData[0].Other &&(
              <AppendTable title={'其他作業'} data={cruiseData[0].Other} />
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
