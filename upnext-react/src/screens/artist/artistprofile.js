import { Box, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import background from "../../assets/BK.png";
import logo from "../../assets/up-next-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../components/drawer";
import Footer from "../../components/footer";
import Bookings from "./bookings";
import Performances from "./performances";
import VerticalSlider from "./slickslider";
import AboutProfile from "./aboutprofile";
import SearchBar from "../../components/searchbar";
import { useState } from "react";
import Perf from "./perof";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "67px",
    "@media (max-width: 768px)": {
      marginLeft: "0px",
      width: "100%",
      paddingTop: "50px",
      marginTop: "40%",
    },
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    maxWidth: "1080px",
    width: "90%",
  },
  dailyStats: {
    display: "flex",
    flexDirection: "column",
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
  customHeading: {
    color: "white",
    fontFamily: "ebgaramondbold",
    letterSpacing: "-3px",
    fontStyle: "normal",
    fontSize: "72px",
    "@media (max-width: 768px)": {
      display: "none",
    },
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "40px",
  },
  navStyle: {
    marginTop: "-70px",
    display: "none",
    "@media (max-width: 768px)": {
      display: "flex",
      width: "100%",
      height: "60px",
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  buttonStyle: {
    width: "100%",
    backgroundColor: "#A83B65 !important",
    color: "white",
    marginTop: "10px !important",
    "@media (max-width: 768px)": {
      margin: "20px 20px !important",
    },
  },
  image: {
    width: "100%",
    "@media (max-width: 768px)": {
      width: "95%",
    },
  },
}));

const ArtistProfile = () => {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        background: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        "@media (max-width: 1660px)": {
          backgroundSize: "contain",
        },
      }}
    >
      <Sidebar showNav={true} />
      {mobile && showSearch && (
        <SearchBar show={showSearch} setShow={setShowSearch} />
      )}

      <Box className={classes.navStyle}>
        <Box />
        <Box sx={{ ml: 5, mt: 2 }}>
          <img src={logo} alt="UpnextLogo" />
        </Box>
        <Box
          sx={{ mr: 2, cursor: "pointer" }}
          onClick={() => {
            setShowSearch(true);
          }}
        >
          <SearchIcon />
        </Box>
      </Box>

      <Box className={classes.container}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          minHeight="calc(100vh - 300px)"
        >
          <Box
            className={classes.customContainer}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "50px",
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Box>
              <img src={logo} alt="UpnextLogo" />
            </Box>
            <Box>
              <SearchBar bgEnable={false} />
            </Box>
          </Box>
          <Box className={classes.customContainer}>
            <Box className={classes.customHeading}>planet neptune</Box>
          </Box>

          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Bookings />
          </Box>

          <Box
            className={classes.customContainer}
            sx={{ mb: 2, mt: 4, flexDirection: "column" }}
          >
            <Box className={classes.customFont}> media </Box>
          </Box>
          <VerticalSlider />
          <br />
          <br />

          <Box className={classes.customContainer} sx={{ mb: 4 }}>
            <Perf />
          </Box>
          {/* <Performances /> */}

          <Box className={classes.customContainer}>
            <AboutProfile />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ArtistProfile;
