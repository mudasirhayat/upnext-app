import { Box, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/up-next-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../components/drawer";
import Footer from "../../components/footer";
import SearchBar from "../../components/searchbar";
import { ReactComponent as Group } from "../../assets/Vector.svg";
import VenueRatedCard from "./ratedCard";
import image3 from "../../assets/search/Image3.png";
import image4 from "../../assets/search/Image4.png";
import image5 from "../../assets/search/Image5.png";
import VenueSwiper from "./swiper";
import { useContext, useState } from "react";
import { AppContext } from "../../context/context";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "67px",
    "@media (max-width: 768px)": {
      marginLeft: "0px",
      width: "100%",
      paddingTop: "50px",
    },
  },
  customContainer: {
try {
    display: "flex",
    maxWidth: "1080px",
} catch (error) {
    console.error("An error occurred:", error);
}
    width: "90%",
  },
  customHeading: {
    color: "white",
    fontFamily: "ebgaramondbold",
    letterSpacing: "-3px",
    fontStyle: "normal",
    fontSize: "72px",
    "@media (max-width: 420px)": {
      fontSize: "58px",
    },
    textAlign: "center",
    marginTop: "25px",
    marginBottom: "40px",
    zIndex: 1,
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
  searchBar: {
    display: "flex",
    alignItems: "center",
    maxWidth: "1080px",
    width: "90%",
  },
  customFont: {
    fontFamily: "bodoni72",
    fontSize: "36px",
    color: "white",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  heading: {
    color: " #A83B65",
    fontFamily: "montserrat",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "160%",
    letterSpacing: "0.15px",
  },
  group: {
    position: "absolute",
    top: "100px",
    right: 0,
    "@media (max-width: 768px)": {
      top: "70px",
      width: "55%",
    },
  },
}));

const VenueSearch = () => {
  const classes = useStyles();
  const { data, search } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #5ab8eb 0%, #f6adb4 25%, #fee7be 50%, rgba(254, 237, 197, 0.00) 75%)",
        position: "relative",
      }}
    >
      <Sidebar showNav={true} />
      {mobile && showSearch && (
        <SearchBar show={showSearch} setShow={setShowSearch} />
      )}

      <Group className={classes.group} />
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
            <Box className={classes.customHeading}>venues</Box>
          </Box>
          <Box
            className={classes.searchBar}
            sx={{
              marginBottom: "20px",
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Box className={classes.customFont} sx={{ zIndex: 1 }}>
              search
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <SearchBar data={data} />
            </Box>
          </Box>

          <Box
            className={classes.customContainer}
            sx={{
              mt: 4,
              "@media (max-width: 768px)": {
                mt: 0,
              },
            }}
          >
            <Box className={classes.heading} sx={{ zIndex: 1 }}>
              Hidden Gems
            </Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <VenueSwiper data={search} />
          </Box>

          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Box className={classes.heading}>Top Rated</Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <VenueRatedCard active={true} image={image3} />
              <VenueRatedCard image={image4} />
              <VenueRatedCard image={image5} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default VenueSearch;
