import { Avatar, Box, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/up-next-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../../components/drawer";
import Footer from "../../components/footer";
import avatar from "../../assets/media1.png";
import UpnextBooking from "./upnextbooking";
import MyBookings from "./mybookings";
import Notifications from "./notifications";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Performances from "./performances";
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
filterButton: {
    borderRadius: "30px",
    important: true,
  }
    backgroundColor: "#184F7B !important",
    marginLeft: "10px !important",
    "@media (max-width: 768px)": {
      fontSize: "10px !important",
    },
  },
  icon: {
    "@media (max-width: 768px)": {
      fontSize: "16px !important",
    },
  },
}));

const Booking = () => {
  const classes = useStyles();
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

          <Box
            className={classes.customContainer}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box className={classes.customHeading}>bookings</Box>
            <Box>
              <ListAltIcon
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

          <Box className={classes.customContainer}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderRadius: "6px",
                background: "#A83B65",
                padding: "20px",
                "@media (max-width: 425px)": {
                  flexDirection: "column",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Avatar alt="" src={avatar} sx={{ width: 65, height: 65 }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    ml: 2,
                    "@media (max-width: 768px)": {
                      width: "100%",
                      flexDirection: "column",
                    },
                  }}
                >
                  <Box
                    sx={{
                      // width: "25%",
                      width: "175px",
                      color: "white",
                      fontFamily: "montserrat",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "133.4%",
                      // "@media (max-width: 1080px)": {
                      //   width: "50%",
                      // },
                      // "@media (max-width: 830px)": {
                      //   width: "50%",
                      // },
                      "@media (max-width: 768px)": {
                        lineHeight: "1em",
                        width: "100%",
                      },
                    }}
                  >
                    The Neptunes
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      pl: 1,
                      "@media (max-width: 768px)": {
                        width: "100%",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: "#184F7B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "20px",
                        maxWidth: "100px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        fontSize: "12px",
                        "@media (max-width: 768px)": {
                          mt: 1,
                        },
                      }}
                    >
                      Rock, Folk
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                  gap: "10px",
                  "@media (max-width: 500px)": {
                    maxWidth: "135px",
                    fontSize: "10px",
                  },
                  "@media (max-width: 425px)": {
                    mt: 4,
                    maxWidth: "100%",
                    width: "100%",
                  },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    ":hover": {
                      bgcolor: "#EAA4AF",
                      color: "white",
                    },
                    background: "white",
                    color: "#A83B65",
                    width: "100%",
                    "@media (max-width: 500px)": {
                      fontSize: "10px",
                    },
                  }}
                >
                  FIND GIG
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      ":hover": {
                        bgcolor: "#EAA4AF",
                        color: "white",
                      },
                      background: "white",
                      color: "#A83B65",
                      width: "50%",
                      "@media (max-width: 500px)": {
                        fontSize: "10px",
                      },
                    }}
                  >
                    History
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      ":hover": {
                        bgcolor: "#EAA4AF",
                        color: "white",
                      },
                      background: "white",
                      color: "#A83B65",
                      width: "50%",
                      "@media (max-width: 500px)": {
                        fontSize: "10px",
                      },
                    }}
                  >
                    Billing
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <UpnextBooking />
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Notifications />
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Box className={classes.customFont}>my bookings</Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <MyBookings />
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                ":hover": {
                  bgcolor: "#EAA4AF",
                  color: "white",
                },
                background: "#A83B65",
                color: "white",
              }}
            >
              Load More
            </Button>
          </Box>
          <Box
            className={classes.customContainer}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Box className={classes.customFont}>next90days</Box>
            <Box>
              <Button
                className={classes.filterButton}
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                <FilterAltIcon className={classes.icon} /> Filter
              </Button>
            </Box>
          </Box>
          <Box
            className={classes.customContainer}
            sx={{ mt: 4, maxWidth: "1085px" }}
          >
            <Box sx={{ display: "flex", overflowX: "auto", gap: "30px" }}>
              <Performances />
              <Performances />
              <Performances />
            </Box>
          </Box>
          <Box className={classes.customContainer} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                ":hover": {
try {
    const data = {
        bgcolor: "#EAA4AF",
        color: "white",
    };
} catch (error) {
    console.error("An error occurred:", error);
}
                },
                background: "#A83B65",
                color: "white",
              }}
            >
              Load More
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Booking;
