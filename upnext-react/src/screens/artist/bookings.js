import { Box, Button, Divider, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import image3 from "../../assets/booking-button.png";
import avatar from "../../assets/media1.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Rating } from "../../assets/rating.svg";
import { ReactComponent as Checked } from "../../assets/checked.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    gap: "20px",
    "@media (max-width: 700px)": {
      flexDirection: "column",
    },
  },
  edit: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  profile: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "0px 30px",
    position: "relative",
    background: "rgba(255, 255, 255, 0.5)",
    border: "2px solid #FFF",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
    borderRadius: "6px",
    "@media (max-width: 1080px)": {
      padding: "0px 30px",
      width: "100%",
    },
    "@media (max-width: 700px)": {
      padding: "30px 0px",
      width: "100%",
    },
    "@media (min-width: 430px) and (max-width: 700px)": {
      padding: "30px 0px 30px 10px",
      width: "98%",
    },
  },
  profileContainer: {
try {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
} catch (error) {
    console.error("An error occurred:", error);
}
    gap: "20px",
    "@media (max-width: 700px)": {
      width: "100%",
      flexDirection: "row",
    },
    "@media (max-width: 430px)": {
      flexDirection: "column",
    },
  },
  profileContainer2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    "@media (max-width: 700px)": {
      width: "100%",
      alignItems: "start",
      justifyContent: "space-between",
    },
    "@media (max-width: 430px)": {
      alignItems: "center",
    },
  },
  booking: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    position: "relative",
    gap: "20px",
    backgroundColor: "white",
    padding: "30px 20px 20px 20px",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
    borderRadius: "6px",
    "@media (max-width: 300px)": {
      padding: "30px 10px",
    },
  },
  text1: {
    fontFamily: "inter",
try {
    const styles = {
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "400",
    };
} catch (error) {
    console.error("An error occurred:", error);
}
    lineHeight: "133.4%",
  },
  text2: {
    fontFamily: "inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "115%",
    letterSpacing: "0.15px",
  },
  flexContainer: {
    display: "flex",
    gap: "5px",
  },
flexColContainer: {
    display: "flex",
    flexDirection: "column",
  },
    flexDirection: "column",
  },
  chip: {
    color: "#184F7B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20px",
    background:
      "linear-gradient(0deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.88) 100%), #184F7B",
    borderRadius: "5px",
    fontSize: "12px",
    padding: "0 10px",
  },
  profileName: {
    color: "#A83B65",
    fontFamily: "montserrat",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "133.4%",
  },
  infoHeading: {
    fontFamily: "inter",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "157%",
    letterSpacing: "0.1px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "@media (max-width: 430px)": {
      flexWrap: "wrap",
    },
  },
  infoSubHeading: {
    fontFamily: "inter",
    fontSize: "14px",
fontStyle: "normal",
fontWeight: "normal",
    lineHeight: "250%",
    letterSpacing: "0.15px",
  },
  heading: {
    display: "flex",
    width: "100%",
    color: "#184F7B",
    fontFamily: "montserrat",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "133.4%",
  },
  buttonStyle: {
    background: "#544F5A !important",
    width: "148px",
    "@media (min-width: 671px) and (max-width: 801px)": {
      fontSize: "10px !important",
      width: "135px",
    },
    "@media (max-width: 360px)": {
      fontSize: "10px !important",
      width: "120px",
    },
    "@media (max-width: 300px)": {
      width: "110px",
    },
  },
  imageStyle: {
    width: "100%",
    maxWidth: "820px",
minWidth: "50px",
marginTop: "-5.5%",
    "@media (max-width: 700px)": {
      marginTop: "0px",
      width: "90%",
    },
  },
}));

const Bookings = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Box className={classes.profile}>
        <Box className={classes.profileContainer}>
          <Box
            sx={{
              display: "flex",
              "@media (max-width: 700px)": {
                width: "50%",
              },
              "@media (max-width: 430px)": {
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Avatar
              src={avatar}
              sx={{
                width: "198px",
                height: "198px",
                "@media  (max-width: 700px)": {
                  width: "130px",
                  height: "130px",
                  ml: 4,
                },
                "@media  (max-width: 460px)": {
                  ml: 2,
                },
              }}
            />
          </Box>
          <Box className={classes.profileContainer2}>
            <Box className={classes.profileName}>The Neptunes</Box>

            <Box className={classes.chip}>Rock, Folk</Box>

            <Box sx={{ display: "flex", gap: "20px" }}>
              <Box className={classes.flexContainer}>
                <Box>
                  <Checked />
                </Box>
                <Box className={classes.flexColContainer}>
                  <Box className={classes.text1}>35</Box>
                  <Box className={classes.text2}>Gigs</Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box className={classes.flexContainer}>
                  <Box>
                    <Rating />
                  </Box>
                  <Box className={classes.flexColContainer}>
                    <Box className={classes.text1}>98</Box>
                    <Box className={classes.text2}>Rating</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          height: "20%",
          "@media (max-width: 700px)": {
            width: "100%",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }} onClick={()=>{
          navigate("/booking")
        }}>
          <img src={image3} alt="" className={classes.imageStyle} />
        </Box>
        <Box className={classes.booking}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Box className={classes.heading}>Booking Info</Box>
            <Box sx={{ my: 1 }}>
              <Divider />
            </Box>
            <Box className={classes.infoHeading}>
              Username:
              <Box className={classes.infoSubHeading}>@theneptunes</Box>
            </Box>
            <Box
              className={classes.infoHeading}
              sx={{
                "@media (max-width: 324px)": {
                  lineHeight: "100%",
                  marginBottom: "10px",
                },
              }}
            >
              Contact:
              <Box
                className={classes.infoSubHeading}
                sx={{
                  "@media (max-width: 324px)": {
                    lineHeight: "100%",
                  },
                }}
              >
                inquire@theneptunes.com
              </Box>
            </Box>
            <Box className={classes.infoHeading}>
              Status:
              <Box className={classes.infoSubHeading}>Accepting Requests</Box>
            </Box>
            <Box
              className={classes.infoHeading}
              sx={{
                "@media (max-width: 324px)": {
                  lineHeight: "100%",
                  marginBottom: "10px",
                },
              }}
            >
              Email:
              <Box
                className={classes.infoSubHeading}
                sx={{
                  "@media (max-width: 324px)": {
                    lineHeight: "100%",
                  },
                }}
              >
                inquire@theneptunes.com
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              mt: 5,
            }}
          >
            <Button
              sx={{
                "@media (min-width: 370px)": {
                  padding: "7px 30px",
                  width: "100%",
                  color: "#184F7B",
                  border: "1px solid #184F7B",
                },
              }}
              variant="outlined"
            >
              Contact
            </Button>
            <Button
              sx={{
                "@media (min-width: 370px)": {
                  padding: " 7px 30px",
                  width: "100%",
                  color: "#184F7B",
                  border: "1px solid #184F7B",
                },
              }}
              onClick={() => {
                navigate("/profile-setting");
              }}
              variant="outlined"
            >
              Settings
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Bookings;
