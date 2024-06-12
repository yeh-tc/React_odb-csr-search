import AnchorIcon from "@mui/icons-material/Anchor";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function CardTemplate({ ship, number, color, people, loading }) {
  return (
    <Card
      elevation={0}
      sx={{
        overflow: "hidden",
        p: 3,
        background: "#fafafa",
        border: `1.5px solid ${color}`,
        borderBottom: `3px solid ${color}`,
        "& pre": {
          p: "16px !important",
          fontSize: "0.75rem",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: color }}>
            <AnchorIcon />
          </Avatar>

          <Typography variant="h6" sx={{ fontSize: {xs:'0.6rem',md:"0.8rem"} }} color={color}>
            {ship}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"
            sx={{ fontFamily: "Montserrat", fontWeight: 500}}>
            {loading ? (
              <Skeleton width={80} sx={{ fontSize: "2rem" }} />
            ) : (
              number
            )}
          </Typography>
          <Typography variant="caption">總航次數</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontFamily: "Montserrat", fontWeight: 500 }}
          >
            {loading ? (
              <Skeleton width={80} sx={{ fontSize: "2rem" }} />
            ) : (
              people
            )}
          </Typography>
          <Typography variant="caption">總人次</Typography>
        </Box>
      </Box>
    </Card>
  );
}
