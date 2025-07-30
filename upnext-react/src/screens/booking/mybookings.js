import { Avatar, Box, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import image5 from "../../assets/search/Image5.png";
import { useContext } from "react";
import { AppContext } from "../../context/context";

const PerformanceDate = ({ text = "Book", coloring, textColor = "white" }) => {
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
            <CalendarTodayIcon
              style={{ color: "grey", width: "16px", height: "16px" }}
            />
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
            background: coloring,
            color: textColor,
            borderRadius: "16px",
            fontFamily: "inter",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "18px",
            letterSpacing: "0.16px",
            maxWidth: "100px",
            padding: "10px 40px",
            marginRight: "10px",
            "@media (max-width: 485px)": {
              padding: "0px 30px",
              marginRight: "5px",
            },
            "&:hover": {
              opacity: 0.8,
              background: coloring,
            },
          }}
        >
          {text}
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            height: "30px",
            background: "#A83B65",
            borderRadius: "16px",
            fontFamily: "inter",
            fontSize: "13px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "18px",
            letterSpacing: "0.16px",
            padding: "5px 15px",
            "@media (max-width: 485px)": {
              padding: "0px 0px",
            },
            "&:hover": {
              opacity: 0.8,
              background: "#A83B65",
            },
          }}
        >
          Details
        </Button>
      </Box>
    </Box>
  );
};

const MyBookings = () => {
  const { bookings } = useContext(AppContext);

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
            color: "#A83B65",
            fontFamily: "montserrat",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "32px",
            letterSpacing: "0.15px",
          }}
        >
          Event Dates
        </Box>
        <Box sx={{ mr: 2 }}>
          <MoreVertIcon />
        </Box>
      </Box>
      <PerformanceDate text={"Booked"} coloring={"#4CAF50"} />
      <PerformanceDate
        text={"Terms"}
        coloring={"#FFCA82"}
        textColor={"#184F7B"}
      />
      <PerformanceDate text={"Pending"} coloring={"#DB4437"} />
      <PerformanceDate text={"Booked"} coloring={"#4CAF50"} />
      <PerformanceDate text={"Booked"} coloring={"#4CAF50"} />
      {Array.from({ length: bookings }, (_, index) => (
        <PerformanceDate text={"Booked"} coloring={"#4CAF50"} key={index} />
      ))}
    </Box>
  );
};

export default MyBookings;
