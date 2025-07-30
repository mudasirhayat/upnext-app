import { Avatar, Box, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import avatar from "../../assets/avatar/Avatar.png";
import avatar1 from "../../assets/avatar/Avatar1.png";
import avatar2 from "../../assets/avatar/Avatar2.png";
import avatar3 from "../../assets/avatar/Avatar3.png";
import avatar4 from "../../assets/avatar/Avatar4.png";
import tags1 from "../../assets/Tags.svg";
import tags from "../../assets/tags.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useStyles = makeStyles((theme) => ({
  text1: {
    gridArea: "text1",
  },
  text2: {
    gridArea: "text2",
  },
  booking: {
    gridArea: "booking",
    borderRadius: "6px",
    boxShadow: " 0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
  },
  tags: {
    gridArea: "tags",
    borderRadius: "6px",
    boxShadow: " 0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
  },
  gridContainer: {
    display: "flex",
    width: "100%",
    gap: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  customFont: {
    color: "#184F7B",
    fontFamily: "bodoni72",
    fontSize: "36px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "40px",
    letterSpacing: "0.4px",
    "@media (max-width: 400px)": {
      fontSize: "26px",
    },
  },
}));

const PerformanceDate = ({ image }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        marginTop: "28px",
        "@media (max-width: 429px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          "@media (max-width: 429px)": {
            width: "100%",
          },
          "@media (max-width: 485px)": {
            width: "100%",
          },
        }}
      >
        <Box sx={{ mr: 1 }}>
          <Avatar src={image} alt="" width="36px" height="36px" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              borderRadius: "6px 6px 0px 0px",
              fontFamily: "inter",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "175%",
              letterSpacing: "0.16px",
            }}
          >
            Live Performance
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "inter",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "19.9px",
              letterSpacing: "0.4px",
              mb: 2,
            }}
          >
            <CalendarTodayIcon
              style={{ color: "grey", width: "16px", height: "16px" }}
            />
            <Box sx={{ ml: 1 }}>21 Jul | 08:20-10:30</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MyBookings = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "6px",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          my: 1,
        }}
      >
        <Box
          sx={{
            color: "#A83B65",
            fontFamily: "montserrat",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "32px",
            letterSpacing: "0.15px",
          }}
        >
          Performance Dates
        </Box>
        <Box sx={{ mr: 2 }}>
          <MoreVertIcon />
        </Box>
      </Box>
      <PerformanceDate image={avatar}/>
      <PerformanceDate image={avatar1} />
      <PerformanceDate image={avatar2} />
      <PerformanceDate image={avatar3} />
      <PerformanceDate image={avatar4} />
    </Box>
  );
};

const Perf = () => {
  const classes = useStyles();
  const mobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box className={classes.gridContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: "20px",
          "@media (max-width: 768px)": {
            width: "100%",
          },
        }}
      >
        <Box className={classes.text1}>
          <Box className={classes.customFont}> bookings </Box>
        </Box>
        <Box className={classes.booking}>
          <MyBookings />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: "20px",
          "@media (max-width: 768px)": {
            width: "100%",
          },
        }}
      >
        <Box className={classes.text2}>
          <Box className={classes.customFont}> tags </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: mobile ? "0px" : "547px",
            justifyContent: "space-between",
            background: "white",
            boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
            borderRadius: "6px",
          }}
        >
          {mobile ? (
            <Box>
              <img
                src={tags}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                maxWidth: "375px",
                minWidth: "100px",
                padding: "20px",
                paddingBottom: "0px",
              }}
            >
              <img
                src={tags1}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              paddingBottom: "30px",
              ml: 2.5,
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Button
              sx={{
                backgroundColor: "#A83B65",
                "&:hover": {
                  opacity: 0.9,
                  background: "#A83B65",
                },
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                padding: "8px 33px",
              }}
            >
              Edit tags
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Perf;
