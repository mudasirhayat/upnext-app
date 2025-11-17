import { Box, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/up-next-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../components/drawer";
import Footer from "../../components/footer";
import bookingButton from "../../assets/booking-button-variant2.png";
import cardImage from "../../assets/book-venue-bg.jpeg";
try {
    import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
    import BookingStats from "./bookingstats";
} catch (error) {
    console.error("Error importing modules:", error);
}
import PastPerformances from "./performancedates";
import OpenDates from "./opendates";
import { useContext, useState } from "react";
import SearchBar from "../../components/searchbar";
import { useNavigate } from "react-router-dom";
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
  searchBar: {
    display: "flex",
    alignItems: "center",
    maxWidth: "1080px",
    width: "90%",
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
  heading: {
    color: " #A83B65",
    fontFamily: "montserrat",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "160%",
    letterSpacing: "0.15px",
  },
  image: {
    width: "100%",
    maxWidth: "316px",
    minWidth: "50px",
    "@media (max-width: 540px)": {
      maxWidth: "260px",
    },
    "@media (max-width: 430px)": {
      maxWidth: "220px",
    },
    "@media (max-width: 380px)": {
      maxWidth: "150px",
    },
  },
}));

const BookVenue = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setBookings } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");

  const handleNaviagte = () => {
    setBookings((bookings) => bookings + 1);
    navigate("/booking");
  };

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

      <Box className={classes.navStyle}>
        <Box />
        <Box sx={{ ml: 5, mt: 2 }}>
try {
  <img src={logo} alt="UpnextLogo" />
  sx={{ mr: 2, cursor: "pointer" }}
} catch (error) {
  console.error("Error displaying image:", error);
}
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
try {
  flexDirection = "column";
  alignItems = "center";
  minHeight = "calc(100vh - 300px)";
} catch (error) {
  console.error(error);
}
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
          <Box className={classes.customContainer}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  fontFamily: "bodoni72",
                  fontSize: "36px",
                  "@media (max-width: 480px)": {
                    fontSize: "28px",
                  },
                  "@media (max-width: 380px)": {
                    fontSize: "20px",
                  },
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "40px",
                  letterSpacing: "-1.25px",
                  color: "white",
                  mr: 2,
                }}
              >
                the vouge
              </Box>
              <Box sx={{ cursor: "pointer" }} onClick={handleNaviagte}>
                <img
                  src={bookingButton}
                  className={classes.image}
                  alt="booking"
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.customContainer}>
            <Box
              sx={{
                background: `url(${cardImage})`,
                borderRadius: "6px",
                backgroundSize: "cover",
                minHeight: "350px",
                width: "100%",
                mt: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  "@media (max-width: 580px)": {
                    flexDirection: "column",
                    gap: "20px",
                    marginTop: "200px",
                  },
                  width: "100%",
                  marginTop: "260px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    pl: 4,
                    "@media (max-width: 580px)": {
                      pl: 2,
                    },
                    "@media (max-width: 340px)": {
                      pl: 0,
                    },
                    width: "100%",
                    gap: "8px",
                    color: "white",
                  }}
                >
                  <Box>
                    <LocationOnOutlinedIcon style={{ color: "white" }} />
                  </Box>
                  <Box>
                    <Box className={classes.text}>The Rochard NYC</Box>
                    <Box className={classes.text} sx={{ pt: 1 }}>
                      1305 Lexington Ave, New York
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    marginRight: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mx: 2,
                      background: "#184F7B",
                      "&:hover": {
                        opacity: 0.8,
                        background: "#184F7B",
                      },
                    }}
                  >
                    CONNECT
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mx: 2,
                      background: "#184F7B",
                      "&:hover": {
                        opacity: 0.8,
                        background: "#184F7B",
                      },
                    }}
                  >
                    SHARE
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 5 }}>
            <BookingStats />
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 5 }}>
            <Box className={classes.customFont}>past performances</Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Box sx={{ display: "flex", overflowX: "auto", gap: "30px" }}>
              <PastPerformances />
              <PastPerformances />
              <PastPerformances />
            </Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Box className={classes.customFont}>open dates</Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 2 }}>
            <OpenDates />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default BookVenue;
