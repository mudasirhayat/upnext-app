import { Avatar, Box, Button, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../assets/up-next-logo.svg";
import image1 from "../assets/Card1.png";
import image3 from "../assets/Card3.png";
import image4 from "../assets/Card4.png";
import SearchBar from "../components/searchbar";
import Sidebar from "../components/drawer";
import Footer from "../components/footer";
import Slick from "../components/slider";
import { useContext, useState } from "react";
import { AppContext } from "../context/context";
import SearchIcon from "@mui/icons-material/Search";
import avatar from "../assets/media1.png";
import { useNavigate } from "react-router-dom";

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
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  dailyStats: {
    display: "flex",
    flexDirection: "column",
  },

  image1: {
    gridArea: "image1",
  },
  image2: {
    gridArea: "image2",
  },
  image3: {
    gridArea: "image3",
  },
  image4: {
    gridArea: "image4",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)"
  },
  gridContainer: {
    width: "90%",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateAreas: `
      'image1 image3'
      'image1 image3'
      'image2 image3'
      'image4 image4'
    `,

    gridTemplateColumns: "47% 51%",
    gridTemplateRows: "1fr 1fr",

    "@media (max-width: 768px)": {
      gridTemplateColumns: "100%",
      gridTemplateRows: "auto",
      gridTemplateAreas: `
      'image1'
      'image2'
      'image3'
      'image4'
    `,
    },
    gap: "20px",
  },
  customFont: {
    fontFamily: "bodoni72",
    fontSize: "36px",
    color: "#184F7B",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "28px",
    },
  },
  customContainer: {
    display: "flex",
    maxWidth: "1080px",
    width: "90%",
  },
  slider: {
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
    "@media (max-width: 400px)": {
      fontSize: "48px",
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
}));

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setShowTitle] = useState(true);
  const { data } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #5ab8eb 0%, #f6adb4 40%, #fee7be 70%, rgba(254, 237, 197, 0.00) 75%)",
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
          justifyContent="center"
          alignItems="center"
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
          <Box className={classes.customHeading}>dashboard</Box>
          <Box className={classes.searchBar} sx={{ marginBottom: "20px" }}>
            <Box className={classes.customFont}>search</Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <SearchBar data={data} />
            </Box>
          </Box>

          {title && (
            <>
              <Box
                className={classes.customContainer}
                sx={{ marginBottom: "20px" }}
              >
                <Box className={classes.customFont}> notifications </Box>
              </Box>
              <Box className={classes.slider}>
                <Slick setShowTitle={setShowTitle} />
              </Box>
            </>
          )}
          <Box
            className={classes.customContainer}
            sx={{ marginBottom: "20px" }}
          >
            <Box className={classes.customFont}> daily stats </Box>
          </Box>
          <Box className={classes.gridContainer}>
            <Box className={classes.image1}>
              <img
                src={image1}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box className={classes.image2}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#A83B65",
                  borderRadius: "6px",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <Box>
                    <Avatar
                      src={avatar}
                      sx={{
                        width: "65px",
                        height: "65px",
                        "@media (min-width: 800px)": {
                          width: "80px",
height: "80px",
color: "white",
                      fontFamily: "montserrat",
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "133.4%",
                      ml: 2,
                      "@media (max-width: 325px)": {
                        fontSize: "18px",
                      },
                    }}
                  >
                    The Neptunes
                  </Box>
                </Box>
                <Button
                  sx={{
                    display: "flex",
                    m: 2,
                    background: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#A83B65",
                    borderRadius: "5px",
                    height: "50px",
                    fontFamily: "inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "24px",
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                    "&:hover": {
                      opacity: 0.9,
                      background: "white",
                    },
                  }}
                  onClick={() => {
                    navigate("/artist-profile");
                  }}
                >
                  Our profile
                </Button>
              </Box>
            </Box>
            <Box className={classes.image3}>
              <img
                src={image3}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Box className={classes.image4}>
              <img
                src={image4}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
