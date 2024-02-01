import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";

import LinearProgress from "@mui/material/LinearProgress";

import TuneIcon from "@mui/icons-material/Tune";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import { useQuery } from "react-query";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import CruiseTable from "../components/CruiseTable";

//檢查日期格式是否符合
const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000-00-00"
      definitions={{
        0: /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
TextMaskAdapter.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

//檢查日期數字是否符合
const validateDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const currentYear = new Date().getFullYear();
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (
    year > currentYear ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth[month - 1]
  ) {
    return false;
  }
  return true;
};
//把目前js的日期 變成 input 需要格式
function formatDate(date) {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}
//react-query
function useCruiseData(ship, cruiseid, leader, date1, date2, canFetch) {
  return useQuery(
    ["cruiseData", ship, cruiseid, leader, date1, date2],
    async () => {
      if (!canFetch) {
        return { data: [], canFetch: false };
      }
      const response = await fetch(
        `https://api.odb.ntu.edu.tw/cruise/csrqry?ship=${ship}&crid=${cruiseid}&leader=${leader}&start=${date1}&end=${date2}&append=`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      enabled: canFetch,
    }
  );
}

export default function QueryForm() {
  const today = new Date();
  const sixMonthsBefore = new Date(new Date().setMonth(today.getMonth() - 6));
  const [date1, setDate1] = useState(formatDate(sixMonthsBefore));
  const [date2, setDate2] = useState(formatDate(today));
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const shipOptions = ["OR1", "OR2", "OR3", "NOR1", "NOR2", "NOR3"];
  const [ship, setShip] = useState(["OR1", "OR2", "OR3", "NOR1", "NOR2", "NOR3",]);
  const [cruiseid, setCruiseid] = useState("*");
  const [leader, setLeader] = useState("*");
  const [canFetch, setCanFetch] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState("");
  const {data: cruiseData, isLoading, isError,} = useCruiseData(ship, cruiseid, leader, date1, date2, canFetch);

  const checkDates = () => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    if (startDate >= endDate) {
      setError2(true);
      setAlertMessage("結束日期必須大於開始日期。");
      setCanFetch(false);
    } else {
      setError2(false);
      setAlertMessage("");
      setCanFetch(true);
    }
  };
  useEffect(() => {
    checkDates();
  }, [date1, date2]);

  useEffect(() => {
    setCanFetch(!(error1 || error2));
  }, [error1, error2]);

  useEffect(() => {
    const url = `https://api.odb.ntu.edu.tw/cruise/csrqry?ship=${ship.join(',')}&crid=${cruiseid}&leader=${leader}&start=${date1}&end=${date2}&append=&format=csv`;
    setDownloadUrl(url);
  }, [ship, cruiseid, leader, date1, date2]);


  //起始日期
  // Handle change for date1
  const handleChange1 = (event) => {
    const newValue = event.target.value;
    setDate1(newValue);
    const valid = validateDate(newValue);
    setError1(!valid);
    if (valid) {
      checkDates(); // Recheck dates after changing date1
    } else {
      setCanFetch(false);
    }
  };

  // Handle change for date2
  const handleChange2 = (event) => {
    const newValue = event.target.value;
    setDate2(newValue);
    const valid = validateDate(newValue);
    setError2(!valid);
    if (valid) {
      checkDates(); // Recheck dates after changing date2
    } else {
      setCanFetch(false);
    }
  };
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const renderFilters = () => (
    <React.Fragment>
      <Box sx={{ gridArea: "ship" }}>
        <Typography
          variant="subtitle2"
          display="block"
          gutterBottom
          sx={{ color: "#474747" }}
        >
          研究船
        </Typography>
        <Autocomplete
          value={ship}
          limitTags={2}
          size="small"
          onChange={(event, newValue) => {
            setShip(newValue);
          }}
          multiple
          placeholder="選擇研究船"
          options={shipOptions}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          noOptionsText="研究船不存在"
          sx={{
            minWidth: 0,
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(39, 137, 227)",
            },
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="選擇研究船" size="small" />
          )}
        />
      </Box>
      <Box sx={{ gridArea: "curise" }}>
        <Typography
          value={cruiseid}
          variant="subtitle2"
          display="block"
          gutterBottom
          sx={{ color: "#474747" }}
        >
          航次代號
        </Typography>
        <OutlinedInput
          size="small"
          placeholder="加上星號代表任意字元字串(ex：*901)"
          onChange={(event) => {
            setCruiseid(event.target.value);
          }}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(39, 137, 227)",
            },
            width: "100%",
          }}
        />
      </Box>
      <Box sx={{ gridArea: "leader" }}>
        <Typography
          value={leader}
          variant="subtitle2"
          display="block"
          gutterBottom
          sx={{ color: "#474747" }}
        >
          領隊教授
        </Typography>

        <OutlinedInput
          size="small"
          placeholder="加上星號代表任意字元字串，逗號隔開不同字串(ex：王*,陳*)"
          onChange={(event) => {
            setLeader(event.target.value);
          }}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(39, 137, 227)", // Change to your desired color
            },
            width: "100%",
          }}
        />
      </Box>
      <Box sx={{ gridArea: "date" }}>
        <Typography
          variant="subtitle2"
          display="block"
          gutterBottom
          sx={{ color: "#474747" }}
        >
          進港區間{" "}
          <span style={{ fontSize: "13px", color: "#2789E3" }}>
            預設為查詢六個月內之航次資料
          </span>
        </Typography>

        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ flex: 1 }}>
            <OutlinedInput
              size="small"
              value={date1}
              onChange={handleChange1}
              placeholder="yyyy-mm-dd"
              name="departureDate1"
              slotProps={{ input: { component: TextMaskAdapter } }}
              sx={{
                fontFamily: "'Noto Sans TC', sans-serif",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(39, 137, 227)", // Change to your desired color
                },
                width: "100%",
              }}
            />
            <FormHelperText
              sx={{
                height: "1em",
                fontSize: "14px",
                color: error1 ? "#C41C1C" : "transparent",
                fontFamily: "'Noto Sans TC', sans-serif",
              }}
            >
              {error1 ? "日期格式錯誤" : "⠀"}
            </FormHelperText>
          </Box>
          <Typography sx={{ mx: 1, fontFamily: "'Noto Sans TC', sans-serif" }}>
            至
          </Typography>
          <Box sx={{ flex: 1 }}>
            <OutlinedInput
              size="small"
              value={date2}
              onChange={handleChange2}
              placeholder="yyyy-mm-dd"
              name="departureDate2"
              slotProps={{ input: { component: TextMaskAdapter } }}
              sx={{
                flex: 1,
                fontFamily: "'Noto Sans TC', sans-serif",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(39, 137, 227)", // Change to your desired color
                },
                width: "100%",
              }}
            />
            <FormHelperText
              sx={{
                height: "1em",
                fontSize: "14px",
                color: error2 ? "#C41C1C" : "transparent",
                fontFamily: "'Noto Sans TC', sans-serif",
              }}
            >
              {error2 ? alertMessage || "日期格式錯誤" : "⠀"}
            </FormHelperText>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: 500, color: "##71A1C" }}>
          查詢探測報告
        </Typography>
        <Button
          startIcon={<DownloadRoundedIcon />}
          href={downloadUrl}
          size="small"
          variant="outlined"
          sx={{
            color: "#2789E3",
          }}
        >
          下載 csv
        </Button>
      </Stack>
      <Box
        sx={{
          py: { xs: 1.5, sm: 2, md: 2.5, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            paddingBottom: { xs: 2 },
            my: 1,
            gap: 1,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Button
            startIcon={<TuneIcon />}
            size="small"
            variant="outlined"
            onClick={toggleFilter}
            sx={{
              color: "#2789E3",
              marginLeft: "auto",
              px: 2.9,
            }}
          >
            篩選
          </Button>

          <Dialog
            fullScreen
            open={openFilter}
            onClose={toggleFilter}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle sx={{ mt: 2 }} id="alert-dialog-title">
              {"篩選搜尋條件"}
            </DialogTitle>

            <Divider sx={{ my: 2 }} />
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {renderFilters()}
                <DialogActions>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#2789E3",
                    }}
                    onClick={toggleFilter}
                  >
                    取消
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#2789E3",
                    }}
                    onClick={toggleFilter}
                  >
                    確定
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
        <Box
          sx={{
            borderRadius: "sm",
            paddingTop: { sm: 1.5, md: 1.5, lg: 2 },
            paddingBottom: { sm: 3, md: 3.5, lg: 4 },
            display: { xs: "none", sm: "grid" },
            flexWrap: "wrap",
            gap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(300px, 1fr))",
              sm: "repeat(2, minmax(20px, 1fr))",
              md: "repeat(2, minmax(20px, 1fr))",
              xl: "repeat(4, minmax(20px, 1fr))",
            },
            gridTemplateRows: {
              xs: "auto auto auto auto",
              sm: "auto auto auto",
              md: "auto auto",
              xl: "auto",
            },
            gridTemplateAreas: {
              xs: `"ship"
          "curise"
          "leader"
          "date"`,
              sm: `"ship curise"
          "leader leader"
          "date date"`,
              md: `"ship curise"
          "leader date"`,
              xl: `"ship curise leader date"`,
            },
          }}
        >
          {renderFilters()}
        </Box>

        {isLoading ? (
          <LinearProgress />
        ) : (
          isError && (
            <Alert severity="error">資料庫連線異常，請您稍後再試，謝謝。</Alert>
          )
        )}

        <CruiseTable cruiseData={cruiseData || []} />
      </Box>
    </>
  );
}
