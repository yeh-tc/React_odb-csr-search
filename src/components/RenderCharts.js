import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChartTemplate from "./ChartTemplate";
import { Typography } from "@mui/material";


export default function RenderCharts({ data, year }) {

  const [selectedShip, setSelectedShip] = useState(0);
  const ships = [
    { name: year < 2020 ? "OR1" : "NOR1", color: "#2789E3" },
    { name: year < 2020 ? "OR2" : "NOR2", color: "#fd9602" },
    { name: year < 2020 ? "OR3" : "NOR3", color: "#EF6C8F" }
  ];
  const shipData = ships.map(ship => countDepartmentByShipName(data, ship.name));
  
  return (
    <Card
      elevation={0}
      sx={{
        background: "#fafafa",
        p: 2,
        mb:5
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box display="flex" justifyContent="end" alignItems="center" sx={{pb:1}}>
          <ButtonGroup variant="outlined"  color="secondary" aria-label="ship selection buttons">
            {ships.map((ship, index) => (
              <Button
                size='medium'
                key={ship.name}
                onClick={() => setSelectedShip(index)}
                style={{ color: selectedShip === index ? ship.color : "#757575" }}
              >
                {ship.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        {ships.map((ship, index) => (
          <div key={ship.name} hidden={selectedShip !== index}>
            {selectedShip === index && (
              <Box sx={{ p: 3 }}>
                <ChartTemplate data={shipData[index]} color={ship.color}/>
              </Box>
            )}
          </div>
        ))}
      </Box>
      <Typography sx={{ px: 5 ,fontSize: '0.85rem',}}>*其它: 包含非學術與國外單位</Typography>
      <Typography sx={{ px: 5 ,fontSize: '0.85rem',}}>**首頁可下載探測報告 csv 檔</Typography>
    </Card>
  );
}

const countDepartmentByShipName = (data,ship) =>{
    const departmentMapping = {
        "臺大": "臺灣大學",
        "台大": "臺灣大學",
        "國立台灣大學": "臺灣大學",
        "國立臺灣大學":"臺灣大學",
        "海軍官校應用科學系":"海軍軍官學校",
        "海軍官校":"海軍軍官學校",
        "大氣海洋局":"海軍大氣海洋局",
        "中研院": "中央研究院",
        "國立海洋大學":"海洋大學",
        "臺灣海洋大學":"海洋大學",
        "國立臺灣海洋大學":"海洋大學",
        "海大":"海洋大學",
        "中山海科系":"中山大學",
        "中山":"中山大學",
        "國立中山大學":"中山大學",
        "中央":"中央大學",
        "中大":"中央大學",
        "國立中央大學":"中央大學",
        "高科大":"高雄科技大學",
        "高雄科技":"高雄科技大學",
        "國立高雄科技大學":"高雄科技大學",
        "成大":"成功大學",
        "東吳":"東吳大學",
        "台師大":"臺灣師範大學",
        "臺師大":"臺灣師範大學",
        "師大":"臺灣師範大學",
        "師範大學":"臺灣師範大學",
        "國立臺灣師範大學":"臺灣師範大學",
        "北教大":"臺北教育大學",
        "高師大":"高雄師範大學",
        "國海院":"國家海洋研究院",
        "海生館":"海洋生物博物館",
        "國立海洋生物博物館":"海洋生物博物館",
        "海保署":"海洋保育署",
        "高醫大":"高雄醫學大學",
        "淡大":"淡江大學",
        "氣象局":"中央氣象局",
        "台南大":"臺南大學",
        "台南大學":"臺南大學",
        "澎科大":"澎湖科技大學",
        "澎湖科大":"澎湖科技大學",
        "屏科大":"屏東科技大學",
        "國立東華大學海洋生物研究":"東華大學",
        "TORI":"台灣海洋科技研究中心",
        "海洋科技研究中心":"台灣海洋科技研究中心",
        "國研院海科中心":"台灣海洋科技研究中心",
        "臺灣海洋聯盟(TOU)":"臺灣海洋聯盟",
        "崑山大學":"崑山科技大學",
        "東森電視":"其它",//NOR20020
        "全球測繪科技":"其它",//NOR20015//NOR20021
        "光春企業":"其它",//NOR20012
        "金陞士":"其它",//NOR20012
        "台船":"其它",//NOR10002A//NOR1T009//NOR1T016
        "鎮儀":"其它",//NOR10045
        "高雄港10號船塢艤裝碼頭":"其它",//NOR3195B
        "明宗行":"其它",//NOR10064
        "環星科技":"其它",//NOR20060
        "環興科技":"其它",//NOR20110
        "日本九州大學":"其它",//NOR1T027
        "SAIC":"其它",//NOR10065A /NOR10065
        "KLEY":"其它",//NOR1T030
        "ODU":"其它",//NOR1T030
        "WU-APL":"其它",//NOR10033//University of Washington
        "法國自然史博物館":"其它",//NOR10047,
        "丞海海事工程有限公司":"其它",//NOR20097
        "台灣電視台":"其它",//NOR30166
        "無用學堂":"其它",//NOR20101
        "萬城生活實業有限公司":"其它",//NOR20103
        "優聯科技":"其它",//NOR20105
        "行政院農委會水產試驗所":"行政院農委會",//NOR30175
        "八里汙水場":"其它",//NOR20110
        "兆豐航太":"其它",//NOR20114
        "其他":"其它",//NOR10052
    };
    const entries =data.filter(entry => entry.CruiseBasicData.ShipName === ship) ;
    const counts =  entries.reduce((acc,entry)=>{
        entry.Participants.Department.forEach((dept, index)=>{
            const participantCount = entry.Participants.Name[index].split('、').length;
            const mappedDept = departmentMapping[dept] || dept;
            acc[mappedDept] = (acc[mappedDept] || 0) + participantCount;
        })
        return acc;
    },{});

    const sortedCounts= Object.entries(counts).sort((a,b)=>b[1]-a[1]);

    return sortedCounts;
    
}

