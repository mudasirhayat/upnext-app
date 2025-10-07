import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import stats1 from "../../assets/stats1.png";
import stats2 from "../../assets/stats2.png";
import tags from "../../assets/tags-variant2.png";
import about from "../../assets/about.png";

const useStyles = makeStyles((theme) => ({
  image1: {
    gridArea: "image1",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
  },
  image2: {
    gridArea: "image2",
    boxShadow: "0px 3px 10px 0px rgba(58, 53, 65, 0.10)",
  },
  image3: {
    gridArea: "image3",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
  },
  image4: {
    gridArea: "image4",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
  },
gridContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gridGap: "1rem
    display: "grid",
    gridTemplateAreas: `
      'image1 image1 image2 image3'
      'image1 image1 image4 image4'
      'image1 image1 image4 image4'
    `,
    "@media (max-width: 420px)": {
      gridTemplateColumns: "47% 47%",
      gridTemplateAreas: `
      'image2 image3'
      'image1 image1'
      'image4 image4'
    `,
    },
    gap: "20px",
  },
}));

const BookingStats = () => {
  const classes = useStyles();

  return (
    <Box className={classes.gridContainer}>
      <Box className={classes.image1}>
        <img src={about} alt="" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box className={classes.image2}>
        <img src={stats1} alt="" style={{ width: "100%", height: "100%" }} />
      </Box>
      <Box className={classes.image3}>
        <img
          src={stats2}
          alt=""
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      <Box className={classes.image4}>
        <img
          src={tags}
          alt=""
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default BookingStats;
