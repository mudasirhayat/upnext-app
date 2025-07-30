import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import image1 from "../../assets/media1.png";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    display: "flex",
    maxWidth: "1080px",
    width: "90%",
  },
  buttonStyle: {
    width: "100%",
    backgroundColor: "#A83B65 !important",
    color: "white",
    marginTop: "10px !important",
    "@media (max-width: 768px)": {
      margin: "20px 20px !important",
    },
    "@media (max-width: 400px)": {
      fontSize: "10px !important",
      margin: "10px 10px !important",
    },
  },
  image: {
    width: "100%",
    borderRadius: "6px",
    "@media (max-width: 768px)": {
      width: "95%",
    },
  },
}));

const AboutSettings = () => {
  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          marginBottom: "20px",
          padding: "20px 0px",
          flexDirection: "column",
          borderRadius: "6px",
          boxShadow: " 0px 2px 10px 0px rgba(58, 53, 65, 0.10)",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            "@media (max-width: 768px)": {
              display: "flex",
              justifyContent: "center",
              width: "90%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "90%",
              margin: "10px",
              padding: "0 20px",
              color: "#A83B65",
              fontFamily: "montserrat",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "32px",
              letterSpacing: "0.15px",
              "@media (max-width: 768px)": {
                padding: 0,
                display: "flex",
                width: "90%",
              },
              "@media (max-width: 450px)": {
                ml: 2.5,
              },
              "@media (max-width: 365px)": {
                fontSize: "16px",
              },
            }}
          >
            More About The Neptunes
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            margin: "10px",
            "@media (max-width: 768px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "0 20px",
              width: "100%",
              "@media (max-width: 768px)": {
                padding: 0,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={image1} alt="band" className={classes.image} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "90%",
                  marginTop: "10px",
                  "@media (min-width: 769px) and (max-width: 1000px)": {
                    minHeight: "100px",
                  },
                  "@media (max-width: 350px)": {
                    width: "85%",
                    minHeight: "80px",
                  },
                  "@media (max-width: 568px)": {
                    width: "82%",
                    marginBottom: "10px",
                  },
                  "@media (min-width: 500px) and (max-width: 768px)": {
                    width: "88%",
                    marginBottom: "10px",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "20px",
                  maxHeight: "208px",
                  minHeight: "120px",
                }}
              >
                <AddIcon style={{ fontSize: "56px" }} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              color: "#544F5A",
              fontFamily: "montserrat",
              fontSize: "16px",
              "@media (min-width: 769px)": {
                fontSize: "14px",
                width: "180%",
              },
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "143%",
              letterSpacing: "0.15px",
            }}
          >
            <Box>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              fermentum facilisis diam in sollicitudin. In aliquet mauris id
              rhoncus ornare.
            </Box>
            <Box sx={{ pt: 3 }}>
              Maecenas a porttitor mauris. Duis velit diam, maximus sit amet
              augue vel, vestibulum vehicula diam. Proin iaculis neque odio, sed
              facilisis ex porttitor eget. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum
              commodo quam a neque pretium, id accumsan sem porta.
            </Box>
            <Box sx={{ pt: 3 }}>
              Donec risus sem, dictum ut varius eget, varius et risus. Nulla
              nibh nibh, ullamcorper non condimentum a, laoreet ac eros.
              Praesent rutrum nisi metus. Praesent sapien metus, finibus in
              interdum et, dapibus a lorem.
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default AboutSettings;
