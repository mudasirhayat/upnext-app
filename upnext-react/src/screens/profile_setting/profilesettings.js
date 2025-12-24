import { Box, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/up-next-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../components/drawer";
import Footer from "../../components/footer";
import BookingSettings from "./bookingsettings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AboutSettings from "./aboutsettings";
import PerformanceSettings from "./performancesettings";
import MediaUpload from "./mediaupload";
import SearchBar from "../../components/searchbar";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "67px",
    "@media (max-width: 768px)": {
      marginLeft: "0px",
      width: "100%",
      paddingTop: "50px",
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
    "@media (max-width: 420px)": {
      fontSize: "58px",
    },
    "@media (max-width: 400px)": {
      fontSize: "38px",
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

const ArtistProfileSettings = () => {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #5ab8eb 0%, #f6adb4 25%, #fee7be 50%, rgba(254, 237, 197, 0.00) 75%)",
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
    try {
        setShowSearch(true);
    } catch (error) {
        console.error(error);
    }
}
              console.error("An error occurred: ", error);
            }
          }}
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
          <Box
            className={classes.customContainer}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box className={classes.customHeading}>settings</Box>
            <Box>
              <SettingsOutlinedIcon
                sx={{
                  color: "white",
                  fontSize: "92px",
                  "@media (max-width: 420px)": {
                    fontSize: "40px",
                  },
                }}
              />
            </Box>
          </Box>

          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <BookingSettings />
          </Box>

          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Box className={classes.customFont}> media </Box>
          </Box>

          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <MediaUpload />
          </Box>

          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <PerformanceSettings />
          </Box>

          <Box
            className={classes.customContainer}
            sx={{ marginBottom: "20px", flexDirection: "column" }}
          >
            <Box className={classes.customFont}> media </Box>
          </Box>

          <Box className={classes.customContainer}>
            <AboutSettings />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ArtistProfileSettings;
