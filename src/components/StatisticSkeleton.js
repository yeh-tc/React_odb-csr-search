import AnchorIcon from '@mui/icons-material/Anchor';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CardTemplate from "./CardTemplate";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

export default function StatisticSkeleton({error}) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={6} lg={3}>
      <Box  sx={{ display:'flex',alignItems:'center',gap: 2, height:'100%' }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <Select
            disabled
            id="select-year"
            displayEmpty
            label="year"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: {xs:'28px',sm:'30px',md:'30px',lg:'32px',xl:'2.6rem'},
            }}
          >   
        </Select>
        </FormControl>
        <Typography sx={{fontSize: "1.2rem"}}>年</Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <CardTemplate
          ship={"NOR1"}
          number={"0"}
          color="#2789E3"
          loading={true}
          people={error ? "!":"?"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <CardTemplate
          ship={"NOR2"}
          number={"0"}
          color="#fd9602"
          loading={true}
          people={error ? "!":"?"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <CardTemplate
          ship={"NOR3"}
          number={"0"}
          color="#EF6C8F"
          loading={true}
          people={error ? "!":"?"}
        />
      </Grid>
      <Grid item xs={12}>
        <Card
            fullwidth="true"
            elevation={0}
            sx={{
            background: "#fafafa",
            p:2,
            height:'480px',
        }}>
          <Box display="flex" justifyContent="flex-end" sx={{pb:3}}>
            <ButtonGroup color="secondary" variant="outlined" >
              <Button sx={{px:3}}><AnchorIcon/></Button>
              <Button sx={{px:3}}><AnchorIcon/></Button>
              <Button sx={{px:3}}><AnchorIcon/></Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', width:'100%',height:'400px' }}>
           {error ? <ErrorOutlinedIcon color='primary' sx={{fontSize:'50px'}}/>:<CircularProgress />}
         </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
