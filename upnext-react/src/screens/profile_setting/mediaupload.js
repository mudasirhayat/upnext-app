import { Box, Button, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "#EAA4AF",
    textAlign: "center",
    fontFamily: "inter",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    "@media (max-width: 670px)": {
      fontSize: "22px",
    },
  },
}));

const Upload = ({ handleBrowse }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          mt: 2.5,
          flexDirection: "column",
          width: "20%",
          padding: "0px 20px",
          "@media (max-width: 540px)": {
            width: "100%",
            display: "flex",
            gap: "20px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 0px",
          },
        }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{
            background: "#544F5A",
            "&:hover": {
              opacity: 0.9,
              background: "#544F5A",
            },
          }}
        >
          upload
        </Button>
        <Button
          variant="contained"
          component="label"
          sx={{
            background: "#544F5A",
            marginTop: "10px",
            "&:hover": {
              opacity: 0.9,
              background: "#544F5A",
            },
            "@media (max-width: 540px)": {
              marginTop: "0px",
            },
          }}
        >
          Browse
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleBrowse}
          />
        </Button>
      </Box>
    </>
  );
};

const MediaUpload = () => {
  const classes = useStyles();
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const mobile = useMediaQuery("(max-width: 540px)");

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resizeAndAddOverlay(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (index) => {
    setThumbnailImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleBrowse = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resizeAndAddOverlay(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeAndAddOverlay = (imageDataUrl) => {
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const thumbWidth = 150;
      const thumbHeight = 80;

      canvas.width = thumbWidth;
      canvas.height = thumbHeight;
      ctx.drawImage(img, 0, 0, thumbWidth, thumbHeight);

      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, thumbWidth, thumbHeight);

      const thumbnail = canvas.toDataURL();
      setThumbnailImages((prevImages) => [...prevImages, thumbnail]);
    };
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderRadius: "6px",
          background: "#A83B65",
          padding: "20px",
          "@media (max-width: 350px)": {
            padding: "10px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "75%",
            maxHeight: "400px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#EAA4AF",
            },
            scrollbarColor: "#EAA4AF #A83B65",
            scrollbarWidth: "thin",
            "@media (max-width: 540px)": {
              width: "100%",
            },
          }}
        >
          <Box
            sx={{
              padding: "20px",
              borderRadius: "20px",
              "@media (max-width: 540px)": {
                padding: "5px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
                maxWidth: "800px",
                border: "2px solid #EAA4AF",
                outline: "2px dashed #EAA4AF",
                outlineOffset: "-30px",
                "@media (max-width: 670px)": {
                  minHeight: "200px",
                },
                "@media (max-width: 540px)": {
                  outlineOffset: "-20px",
                },
              }}
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <Box className={classes.heading}>drag/drop</Box>
            </Box>
            {mobile && <Upload handleBrowse={handleBrowse} />}
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {thumbnailImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "10px",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Box>
                      <img src={image} alt={`Thumbnail ${index}`} />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        padding: "4px",
                      }}
                    >
                      <CloseOutlinedIcon
                        style={{ color: "white", cursor: "pointer" }}
                        onClick={() => handleRemove(index)}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {!mobile && <Upload handleBrowse={handleBrowse} />}
      </Box>
    </>
  );
};

export default MediaUpload;
