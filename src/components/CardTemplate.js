import AnchorIcon from "@mui/icons-material/Anchor";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";


const InfoBox = ({ label, value, loading, skeletonWidth, skeletonHeight }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexGrow: 1,
    }}
  >
    <Typography
      sx={{
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: {
          xs: "20px",
          sm: "20px",
          md: "24px",
          lg: "28px",
          xl: "2rem",
        },
      }}
    >
      {loading ? (
        <Skeleton
          sx={{
            width: skeletonWidth,
            height: skeletonHeight,
          }}
        />
      ) : (
        value
      )}
    </Typography>
    <Typography variant="caption">{label}</Typography>
  </Box>
);
export default function CardTemplate({ ship, number, color, people, loading }) {
  return (
    <Card
      elevation={0}
      sx={{
        overflow: "hidden",
        p: { xs: 2, md: 2.5 },
        background: "#fafafa",
        border: `1.5px solid ${color}`,
        borderBottom: {xs:`2px solid ${color}`,md:`3px solid ${color}`},
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
            flexGrow: 1,
          }}
        >
          <Avatar
            sx={{
              bgcolor: color,
              width: { xs: 26, md: 34, lg: 32, xl: 36 },
              height: { xs: 26, md: 34, lg: 32, xl: 36 },
              my: { xs: 0.2, sm: 0.3, md: 0.1, lg: 0.4, xl: 0.7 },
            }}
          >
            <AnchorIcon
              sx={{
                width: { xs: 20, md: 24, xl: 28 },
                height: { xs: 20, md: 24, xl: 28 },
              }}
            />
          </Avatar>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "12px", md: "0.8rem", lg: "0.9rem" } }}
            color={color}
          >
            {ship}
          </Typography>
        </Box>

        <InfoBox
          label="總航次數"
          value={number}
          loading={loading}
          skeletonWidth={{ xs: "1.9rem", sm: "2rem", md: "2rem", lg: "3rem", xl: "2.5rem" }}
          skeletonHeight={{ xs: "1.8rem", sm: "30px", md: "36px", lg: "2.6rem", xl: "3rem" }}
        />

        <InfoBox
          label="總人次"
          value={people}
          loading={loading}
          skeletonWidth={{ xs: "1.9rem", sm: "2rem", md: "2rem", lg: "3rem", xl: "3.1rem" }}
          skeletonHeight={{ xs: "1.8rem", sm: "30px", md: "36px", lg: "2.6rem", xl: "3rem" }}
        />
      </Box>
    </Card>
  );
}
