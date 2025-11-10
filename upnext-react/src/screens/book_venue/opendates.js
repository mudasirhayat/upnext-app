import { Avatar, Box, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import image5 from "../../assets/search/Image5.png";

const PerformanceDate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        "@media (max-width: 429px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "50%",
          "@media (max-width: 429px)": {
            width: "100%",
          },
          "@media (max-width: 485px)": {
            width: "100%",
          },
        }}
      >
        <Box sx={{ mr: 1 }}>
          <Avatar alt="" src={image5} width="36px" height="36px" />
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
            <CalendarTodayIcon style={{ color: "grey", width: "16px", height: "16px" }} />
            <Box sx={{ ml: 1 }}>21 Jul | 08:20-10:30</Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          width: "50%",
          "@media (max-width: 429px)": {
            marginBottom: "20px!important",
            paddingLeft: "40px!important",
            justifyContent: "start",
            width: "80%",
          },
          "@media (max-width: 485px)": {
            width: "40%",
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            height: "30px",
            background: "#C4C4C4",
            borderRadius: "16px",
            fontFamily: "inter",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "18px",
letterSpacing: "0.16px",
padding: "5px 15px",
            marginRight: "10px",
            "@media (max-width: 485px)": {
              padding: "0px 0px",
              marginRight: "5px",
            },
            "&:hover": {
              opacity: 0.8,
              background: "#C4C4C4",
            },
          }}
        >
          Details
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            height: "30px",
            background: "#184F7B",
            color: "white",
            borderRadius: "16px",
            fontFamily: "inter",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "18px",
            letterSpacing: "0.16px",
            padding: "10px 20px",
            "@media (max-width: 485px)": {
              padding: "0px 0px",
            },
            "&:hover": {
              opacity: 0.8,
              background: "#184F7B",
            },
          }}
        >
          Book
        </Button>
      </Box>
    </Box>
  );
};

const OpenDates = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "white",
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
        borderRadius: "6px",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          my: 2,
        }}
      >
        <Box
          sx={{
            color: "#184F7B",
            fontFamily: "montserrat",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "32px",
            letterSpacing: "0.15px",
          }}
        >
          Open Venue Dates
        </Box>
        <Box sx={{ mr: 2 }}>
          <MoreVertIcon />
        </Box>
      </Box>
      <PerformanceDate />
      <PerformanceDate />
      <PerformanceDate />
    </Box>
  );
};

export default OpenDates;
