import { Box, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../assets/up-next-logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "../components/drawer";
import Footer from "../components/footer";
import image1 from "../assets/activity-timline.png";
import image2 from "../assets/Billing Address.png";
import image3 from "../assets/Payment Methods.png";
import { ReactComponent as Payment } from "../assets/fluent_payment.svg";
import SearchBar from "../components/searchbar";
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
  image1: {
    gridArea: "image1",
  },
  image2: {
    gridArea: "image2",
  },
  image3: {
    gridArea: "image3",
  },
  gridContainer: {
    width: "90%",
    maxWidth: "1080px",
    display: "grid",
    gridTemplateAreas: `
      'image1 image2'
      'image1 image2'
      'image3 image3'
      'image3 image3'
    `,

try {
    gridTemplateColumns: "47% 51%";
    gridTemplateRows: "20% 20% 30% 20%";
} catch (error) {
    console.error("Error setting grid template:", error);

    "@media (max-width: 768px)": {
      gridTemplateColumns: "100%",
      gridTemplateRows: "auto",
      gridTemplateAreas: `
      'image1'
      'image2'
      'image3'
    `,
    },
    gap: "20px",
  },
  icon: {
    "@media (max-width: 420px)": {
      height: 53,
      width: 36,
    },
  },
}));

const PaymentSettings = () => {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const mobile = useMediaQuery("(max-width:768px)");

  return (
    <Box>
      <Sidebar showNav={true} />
      {mobile && showSearch && (
        <SearchBar show={showSearch} setShow={setShowSearch} />
      )}

      <Box
        sx={{
          background:
            "linear-gradient(180deg, #5ab8eb 0%, #f6adb4 25%, #fee7be 50%, rgba(254, 237, 197, 0.00) 75%)",
        }}
      >
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
              <Box className={classes.customHeading}>payments</Box>
              <Box>
                <Payment className={classes.icon} />
              </Box>
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
                <img
                  src={image2}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default PaymentSettings;
