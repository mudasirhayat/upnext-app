import { Avatar, Box, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import avatar from "../../assets/media1.png";
import { ReactComponent as Rating } from "../../assets/rating.svg";
import { ReactComponent as Checked } from "../../assets/checked.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    gap: "20px",
    "@media (max-width: 670px)": {
      flexDirection: "column",
    },
  },
  edit: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  profile: {
    width: "43%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    position: "relative",
    backgroundColor: "white",
    padding: "30px 20px 20px 20px",
    boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
    borderRadius: "6px",
    "@media (max-width: 670px)": {
      padding: "30px 0px",
      width: "100%",
    },
    "@media (min-width: 520px) and (max-width: 670px)": {
      padding: "30px 0px 30px 10px",
      width: "98%",
    },
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    "@media (max-width: 670px)": {
      width: "100%",
      flexDirection: "row",
    },
    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },
  profileContainer2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    "@media (max-width: 670px)": {
      width: "100%",
      alignItems: "start",
      justifyContent: "space-between",
    },
    "@media (max-width: 520px)": {
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
  },
  text1: {
    fontFamily: "inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: "400",
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
    "@media (max-width: 520px)": {
      flexWrap: "wrap",
    },
  },
  infoSubHeading: {
    fontFamily: "inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
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
    "&:hover": {
      opacity: 0.9,
      background: "#544F5A",
    },
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
}));

const BookingSettings = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Box className={classes.profile}>
        <Box className={classes.edit}>
          <Edit />
        </Box>
        <Box className={classes.profileContainer}>
          <Box
            sx={{
              display: "flex",
              "@media (max-width: 670px)": {
                width: "50%",
              },
              "@media (max-width: 520px)": {
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
          width: "51%",
          gap: "20px",
          "@media (max-width: 670px)": {
            width: "100%",
          },
        }}
      >
        <Box className={classes.booking}>
          <Box className={classes.edit}>
            <Edit />
          </Box>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <Button variant="contained" className={classes.buttonStyle}>
            my rates
          </Button>
          <Button variant="contained" className={classes.buttonStyle}>
            my calendar
          </Button>
          <Button variant="contained" className={classes.buttonStyle}>
            my region
          </Button>
          <Button variant="contained" className={classes.buttonStyle}>
            my terms
          </Button>
          <Button
            variant="contained"
            className={classes.buttonStyle}
            onClick={() => {
              navigate("/booking");
            }}
          >
            my bookings
          </Button>
          <Button
            variant="contained"
            className={classes.buttonStyle}
            onClick={() => {
              navigate("/payment-setting");
            }}
          >
            my billing
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingSettings;
