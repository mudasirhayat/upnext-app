import { Avatar, AvatarGroup, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "rgba(58, 53, 65, 0.68)",
    fontFamily: "inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "20px",
    letterSpacing: "0.15px",
  },
  content: {
    color: "rgba(58, 53, 65, 0.87)",
    fontFamily: "inter",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "32px",
    letterSpacing: "0.15px",
    "@media (max-width: 720px)": {
      fontSize: "14px",
    },
    "@media (min-width: 430px) and (max-width: 467px)": {
      fontSize: "12px",
    },
  },
}));

const UpnextBooking = () => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        "@media (max-width: 429px)": {
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#A83B65",
          width: "20%",
          padding: "20px",
          borderRadius: "6px 0px 0px 6px",
          "@media (max-width: 800px)": {
            width: "30%",
          },
          "@media (max-width: 429px)": {
            borderRadius: "6px 6px 0px 0px",
            padding: "0px",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            color: "#EAA4AF",
            fontFamily: "bodoni72",
            fontSize: "36px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "40px",
            letterSpacing: "-1.25px",
            "@media (max-width: 820px)": {
              fontSize: "32px",
            },
            "@media (max-width: 720px)": {
              fontSize: "30px",
            },
            "@media (max-width: 667px)": {
              fontSize: "26px",
            },
            "@media (min-width: 430px) and (max-width: 467px)": {
              fontSize: "22px",
            },
            "@media (max-width: 429px)": {
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Box>up next:</Box>
          <Box
            sx={{
              color: "white",
              mt: 1,
              "@media (max-width: 429px)": {
                mt: 0,
                ml: 1,
              },
            }}
          >
            July 14th
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "white",
          width: "80%",
          padding: "20px",
          borderRadius: "0px 6px 6px 0px",
          "@media (max-width: 429px)": {
            borderRadius: "0px 0px 6px 6px",
            padding: "0px",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              "@media (max-width: 429px)": {
                alignItems: "center",
                padding: "10px",
              },
            }}
          >
            <Box className={classes.heading}>Gig Venue</Box>
            <Box className={classes.content}>Public School</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              "@media (max-width: 429px)": {
                alignItems: "center",
                padding: "10px",
              },
              "@media (min-width: 430px) and (max-width: 467px)": {
                fontSize: "10px",
                marginLeft: "15px",
              },
            }}
          >
            <Box className={classes.heading}>Gig Pay</Box>
            <Box className={classes.content}>$4450.35</Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "50%",
              "@media (max-width: 720px)": {
                width: "75%",
              },
              "@media (max-width: 429px)": {
                padding: "10px",
              },
            }}
          >
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
<Avatar 
  alt="Agnes Walker" 
  src="/static/images/avatar/4.jpg" 
/>
<Avatar 
  alt="Trevor Henderson" 
/>
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "50%",
              height: "25px",
              "@media (max-width: 720px)": {
                width: "25%",
              },
              "@media (max-width: 429px)": {
                padding: "10px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "70px",
                height: "25px",
                fontSize: "14px",
                background:
                  " linear-gradient(0deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.88) 100%), #A83B65",
                color: "#A83B65",
              }}
            >
              3 days
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpnextBooking;
