import { Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import performances from "../../assets/performance.png";
import tags from "../../assets/tags.png";

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
    marginTop: "20px",
    width: "90%",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateAreas: `
      'text1 text2'
      'booking tags'
      'booking tags'
    `,

    gridTemplateColumns: "47% 51%",
    gridTemplateRows: "5% 20% 60%",

    "@media (max-width: 768px)": {
      gap: "10px",
      gridTemplateColumns: "100%",
      gridTemplateRows: "5% 60% 5% 25%",
      gridTemplateAreas: `
      'text1'
      'booking'
      'text2'
      'tags'
    `,
    },
    gap: "20px",
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

const Performances = () => {
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
            width: "100%",
            height: "100%",
            "@media (min-width: 768px)": {
              flexDirection: "column",
              justifyContent: "space-around",
              backgroundColor: "white",
              borderRadius: "5px",
            },
          }}
        >
          <Box
            sx={{
              "@media (max-width: 768px)": {
                width: "100%",
              },
            }}
          >
            <img src={tags} alt="" style={{ width: "100%", height: "100%" }} />
          </Box>
          <Box
            display="flex"
            width="100%"
            sx={{
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
                marginLeft: "5%",
                padding: "10px 50px",
                marginBottom: "50px",
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

export default Performances;
