import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
export default function InfoForm({ text, info,sx }) {
  return (
    <Box sx={{width:'100%',flex:1,...sx}}>
      <Typography
        variant="caption"
        display="block"
        sx={{ fontWeight: 500, color: "#474747" }}
        gutterBottom
      >
        {text}
      </Typography>
      <TextField
        defaultValue={info}
        InputProps={{
          readOnly: true,
        }}
        sx={{
            width:'100%',
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 1px 2px 0px, rgba(21, 21, 21, 0.08) 0px 1px 2px 0px",
        }}
        size="small"
        multiline
      />
    </Box>
  );
}
