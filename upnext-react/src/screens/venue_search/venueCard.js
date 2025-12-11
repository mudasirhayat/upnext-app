import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Detail } from "../../assets/search/detail.svg";
import { ReactComponent as Connect } from "../../assets/search/connect.svg";
import { ReactComponent as Book } from "../../assets/search/book.svg";
import { ReactComponent as More } from "../../assets/search/more.svg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    display: "flex",
    width: "50px",
    height: "85px",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    background:
      "var(--light-custom-background-primary-background, linear-gradient(0deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.88) 100%), #9155FD)",
  },
  text: {
    color: "var(--light-text-secondary, rgba(58, 53, 65, 0.68))",
    fontFamily: "inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "19.9px",
    letterSpacing: "0.4px",
  },
}));

const VenueCard = ({ active, image, name }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box>
      <Card
        sx={{
          maxWidth: 314,
          boxShadow: active && "0px 2px 15px 0px rgba(168, 59, 101, 0.50)",
        }}
      >
        <CardMedia sx={{ height: 168 }} image={image} title="image" />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Box className={classes.cardContent}>
              <Box
                sx={{
                  color: "#A83B65",
                  fontFamily: "inter",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                  letterSpacing: "0.15px",
                }}
              >
                Jan
              </Box>
              <Box
                sx={{
                  color: "#A83B65",
                  fontFamily: "inter",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "32px",
                  letterSpacing: "0.15px",
                }}
              >
                15
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                flex: "1 0 0",
              }}
            >
              <Typography
                style={{
                  color: "var(--light-text-primary, rgba(58, 53, 65, 0.87))",
                  fontFamily: "inter",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "24px",
                  letterSpacing: "0.15px",
                }}
              >
                {name}
              </Typography>
              <Typography
                style={{
                  color: "var(--light-text-secondary, rgba(58, 53, 65, 0.68))",
                  fontFamily: "inter",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "19.9px",
                  letterSpacing: "0.4px",
                }}
              >
                The WordPress open source,free software project is the community
                behind the…
              </Typography>
            </Box>
          </Box>
          {active && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Detail style={{ cursor: "pointer" }} />
                <Connect style={{ cursor: "pointer" }} />
                <Book
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/book-venue");
                  }}
                />
                <More style={{ cursor: "pointer" }} />
              </Box>
            </>
          )}
          <Divider sx={{ my: 1.5 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "8px",
              }}
            >
              <Box>
                <AccessTimeIcon style={{ color: "#3A3541" }} />
              </Box>
              <Box>
                <Box className={classes.text}>
                  Tuesday, 24 january, 10:20 - 12:30
                </Box>
                <Box className={classes.text}>After 1 week</Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
              }}
            >
              <Box>
<LocationOnOutlinedIcon style={{ color: "#3A3541" }} />
<Box className={classes.text}>The Rochard NYC</Box>
<Box className={classes.text}>1305 Lexington Ave, New York</Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VenueCard;
