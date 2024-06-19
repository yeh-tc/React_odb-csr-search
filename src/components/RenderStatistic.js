import React, { useState } from "react";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import StatisticSkeleton from "./StatisticSkeleton";
import Typography from "@mui/material/Typography";
import RenderCards from "./RenderCards";
import RenderCharts from "./RenderCharts";

const useStatisticData = (year) => {
  return useQuery(["statisticData", year], async () => {
    const url = process.env.REACT_APP_API_URL + `?ship=*&start=${year}-01-01&end=${year}-12-31`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export default function RenderStatistic() {
  const yearnow = new Date().getUTCFullYear();
  const [year, setYear] = useState(yearnow);
  const { data: statisticData, isLoading, isError } = useStatisticData(year);
  const years = [];
  for (let i = 2020; i <= yearnow; i++) {
    years.push(i);
  }
  const handleChange = (event) => {
    setYear(event.target.value);
  };

  if (isLoading) {
    return (
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "#71A1C", mb: 2 }}
        >
          Loading...
        </Typography>
        <StatisticSkeleton />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "#71A1C", mb: 2 }}
        >
          資料庫連線異常，請您稍後再試，謝謝 (｡ŏ_ŏ)
        </Typography>
        <StatisticSkeleton error />
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 500, color: "#71A1C", mb: 2 }}>
        探測報告統計資料
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={6} lg={3}>
          <Box  sx={{ display:'flex',alignItems:'center',gap: 2, height:'100%' }}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
            <Select
              id="select-year"
              value={year}
              onChange={handleChange}
              displayEmpty
              label="year"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: {xs:'28px',sm:'30px',md:'30px',lg:'32px',xl:'2.6rem'},
              }}
            >
              {years.map((year) => {
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Typography sx={{fontSize: "1.2rem"}}>年</Typography>
          </Box>
        </Grid>
        <RenderCards data={statisticData} year={year}/>
        <Grid item xs={12}>
          <RenderCharts data={statisticData} year={year}/>
        </Grid>
      </Grid>
    </Box>
  );
}
