import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import OutlinedInput from '@mui/material/OutlinedInput';
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from '@mui/icons-material/Search';

import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";


const TextMaskAdapter = React.forwardRef(function TextMaskAdapter(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000/00/00"
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
const validateDate = (dateStr) => {
  const [year, month, day] = dateStr.split("/").map(Number);
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

function formatDate(date) {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return `${year}/${month}/${day}`;
}
export default function QueryForm() {
  const today = new Date();
  const sixMonthsBefore = new Date(new Date().setMonth(today.getMonth() - 6));
  const [value1, setValue1] = React.useState(formatDate(sixMonthsBefore));
  const [value2, setValue2] = React.useState(formatDate(today));
  const [error1, setError1] = React.useState(false);
  const [error2, setError2] = React.useState(false);
  const [openFilter, setOpenFilter] = React.useState(false);
  const shipOptions = ["OR1", "OR2", "OR3", "NOR1", "NOR2", "NOR3"];
  const [ship, setShip] = React.useState([]);

  const handleChange1 = (event) => {
    const newValue = event.target.value;
    setValue1(newValue);
    setError1(!validateDate(newValue));
  };

  const handleChange2 = (event) => {
    const newValue = event.target.value;
    setValue2(newValue);
    setError2(!validateDate(newValue));
  };
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const renderFilters = () => (
    <React.Fragment>
      <Box sx={{gridArea: "ship",}}>
      <Typography variant="subtitle2" display="block" gutterBottom sx={{color:'#474747'}}>研究船</Typography>
      <Autocomplete
        value={ship}
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
          <TextField
            {...params}
            placeholder="選擇研究船"
            size="small"
          />
        )}
      />
      </Box>
      <Box sx={{gridArea: "curise" }}>
      
      <Typography variant="subtitle2" display="block" gutterBottom sx={{color:'#474747'}}>航次代號</Typography>
        <OutlinedInput
          size='small'
          placeholder="加上星號代表任意字元字串(ex：*901)"
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(39, 137, 227)",
            },
            width:'100%'
          }}
        />
      
      </Box>
      <Box sx={{ gridArea: "leader" }}>
      <Typography variant="subtitle2" display="block" gutterBottom sx={{color:'#474747'}}>領隊教授</Typography>

        <OutlinedInput
        size='small'
          placeholder="加上星號代表任意字元字串，逗號隔開不同字串(ex：王*,陳*)"
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(39, 137, 227)", // Change to your desired color
            },
            width:'100%'
          }}
        />
     
      </Box>
      <Box sx={{  gridArea: "date" }}>
      <Typography variant="subtitle2" display="block" gutterBottom sx={{color:'#474747'}}>
        進港區間 <span style={{fontSize:'13px',color:'#2789E3'}}>預設為查詢六個月內之航次資料</span>
        
    </Typography>
     
        <Box sx={{display: "flex", width:'100%'}}>
        <Box sx={{flex: 1}}>
          
          <OutlinedInput
          size='small'
            value={value1}
            onChange={handleChange1}
            placeholder="yyyy/mm/dd"
            name="departureDate1"
            slotProps={{ input: { component: TextMaskAdapter } }}
            sx={{
              fontFamily: "'Noto Sans TC', sans-serif",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(39, 137, 227)", // Change to your desired color
              },
              width:'100%'
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
        <Box sx={{flex: 1}}>
          <OutlinedInput
          size='small'
            value={value2}
            onChange={handleChange2}
            placeholder="yyyy/mm/dd"
            name="departureDate2"
            slotProps={{ input: { component: TextMaskAdapter } }}
            sx={{
              flex: 1,
              fontFamily: "'Noto Sans TC', sans-serif",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(39, 137, 227)", // Change to your desired color
              },
              width:'100%'
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
            {error2 ? "日期格式錯誤" : "⠀"}
          </FormHelperText>
        </Box>
        </Box>

      </Box>

    </React.Fragment>
  );



  return (
    <>
    <Box sx={{
        py:{xs:1.5,sm:2,md:2.5,lg:4},}}>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
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
          <DialogTitle sx={{ mt: 2 }} id="alert-dialog-title">{"篩選搜尋條件"}</DialogTitle>

          <Divider sx={{ my: 2 }} />
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {renderFilters()}
              <DialogActions>
                <Button variant="outlined"
          sx={{
            color:'#2789E3',
          }} onClick={toggleFilter}>取消</Button>
                <Button variant="outlined"
          sx={{
            color:'#2789E3',
          }} onClick={toggleFilter}>確定</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>

      </Box>
      <Box
          sx={{
            borderRadius: "sm",
            paddingTop:{sm: 1.5,md:1.5,lg:2},
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
        <Box sx={{width:'100%',display: { xs: "none",sm: "grid" },paddingBottom:{sm:2}}}>
          <Button
           
           startIcon={<SearchIcon />}
           size="small"
           variant="outlined"
           sx={{
             px:2.9,
             color: "#FFFFFF",
             marginLeft: "auto",
             background:"#2789E3",
             '&:hover':{background:"#0B6BCB"}
           }}
         >
           查詢

         </Button>
         </Box>
      </Box>
    </>
  );
}
