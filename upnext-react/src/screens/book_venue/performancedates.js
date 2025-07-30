import { Box, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const PastPerformances = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "205px",
        width: "100%",
        borderRadius: "6px",
        background: "var(--light-background-paper, #FFF)",
        boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
        ml: 0.2,
        mr: 0.5,
        mb: 0.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          backgroundColor: "#184F7B",
          borderRadius: "6px 6px 0px 0px",
          fontFamily: "inter",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "175%",
          letterSpacing: "0.16px",
          color: "white",
        }}
      >
        Live Performance
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
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
        <Box sx={{ display: "flex" }}>
          <Button
            sx={{
              textTransform: "none",
              background: "#C4C4C4",
              borderRadius: "16px",
              marginRight: "10px",
              fontFamily: "inter",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "18px",
              letterSpacing: "0.16px",
              padding: "5px 15px",
              "&:hover": {
                opacity: 0.8,
                background: "#C4C4C4",
              },
            }}
          >
            Review
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: "#184F7B",
              color: "white",
              borderRadius: "16px",
              marginRight: "10px",
              fontFamily: "inter",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "18px",
              letterSpacing: "0.16px",
              padding: "5px 15px",
              "&:hover": {
                opacity: 0.8,
                background: "#184F7B",
              },
            }}
          >
            Details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PastPerformances;
