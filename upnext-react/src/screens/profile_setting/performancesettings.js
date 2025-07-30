import { Box, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import performances from "../../assets/performance_edit.png";
import tags from "../../assets/tags-variant3.png";

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
    backgroundColor: "white",
    boxShadow: " 0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
  },
  gridContainer: {
    marginTop: "20px",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateAreas: `
      'text1 text2'
      'booking tags'
      'booking tags'
    `,

    gridTemplateColumns: "47% 51%",

    "@media (max-width: 670px)": {
      gap: "10px",
      gridTemplateColumns: "100%",
      gridTemplateAreas: `
      'text1'
      'booking'
      'text2'
      'tags'
    `,
    },
    gap: "20px",
    marginBottom: "40px",
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
  customContainer: {
    display: "flex",
    maxWidth: "1080px",
    width: "90%",
  },
}));

const PerformanceSettings = () => {
  const classes = useStyles();

  return (
    <Box className={classes.gridContainer}>
      <Box className={classes.text1}>
        <Box className={classes.customContainer}>
          <Box className={classes.customFont}> bookings </Box>
        </Box>
      </Box>
      <Box className={classes.booking}>
        <img
          src={performances}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Box className={classes.text2}>
        <Box className={classes.customContainer}>
          <Box className={classes.customFont}> tags </Box>
        </Box>
      </Box>
      <Box className={classes.tags}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: "6px",
            "@media (min-width: 670px)": {
              flexDirection: "column",
              justifyContent: "space-around",
              backgroundColor: "white",
            },
          }}
        >
          <Box
            sx={{
              "@media (max-width: 670px)": {
                width: "100%",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "5%",
                mt: 3,
                width: "90%",
                height: "100%",
              }}
            >
              <img
                src={tags}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box>
              <TextField
                style={{
                  width: "90%",
                  marginLeft: "5%",
                  marginBottom: "20px",
                }}
                id="standard-basic"
                label="ENTER TAG"
                variant="standard"
              />
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: "#544F5A",
                  fontFamily: "inter",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginLeft: "5%",
                  padding: "10px 50px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  "&:hover": {
                    opacity: 0.9,
                    background: "#544F5A",
                  },
                  "@media (max-width: 420px)": {
                    fontSize: "14px",
                    padding: "5px 10px !important",
                  },
                }}
              >
                Enter
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformanceSettings;
