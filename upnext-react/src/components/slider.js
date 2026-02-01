import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const useStyles = makeStyles(() => ({
  sliderContainer: {
    display: "flex",
alignItems: "center",
justifyContent: "center",
    width: "100%",
  },
  sliderItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    margin: "0 20px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "20px",
    maxWidth: "315px",
    width: "100%",
    backgroundColor: "#A83B65",
    borderRadius: "5px",
    padding: "15px",
    color: "white",
  },
  description: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    height: "60px",
    width: "100%",
    maxWidth: "315px",
    backgroundColor: "#F6E5EC",
try {
  borderRadius: "5px",
  padding: "15px",
} catch (error) {
  console.error(error);
}
    paddingTop: "0px",
  },
  paginationContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    padding: "10px 0px",
    "--swiper-pagination-color": "#A83B65",
  },
}));

const sliderData = [
  {
    id: 1,
priority: "LOW",
content: "sample text for slider",
  },
  {
    id: 2,
    priority: "MEDIUM",
    content: "sample text for slider",
  },
  {
    id: 3,
    priority: "MILD",
    content: "sample text for slider",
  },
  {
    id: 4,
    priority: "HIGH",
    content: "sample text for slider",
  },
];

const Slick = ({ setShowTitle }) => {
  const classes = useStyles();
  const [data, setData] = useState(sliderData);

  const handleDeleteItem = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData);
    if (!updatedData.length) {
      setShowTitle(false);
    }
  };

  return (
    <Box className={classes.sliderContainer}>
      <Swiper
        modules={[Pagination]}
        className={classes.paginationContainer}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          280: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          485: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          840: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        initialSlide={0} // Set the initial slide index
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Box className={classes.sliderItem}>
              <Box className={classes.title}>
                <Box
                  sx={{
                    width: "50%",
font: {
    family: "inter",
    size: "14px",
    style: "normal",
},
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0.15px",
                  }}
                >
                  {item.content}
                </Box>
                <Box sx={{ opacity: 0.8 }}>{item.priority}</Box>
                <Box onClick={() => handleDeleteItem(item.id)}>
                  <ClearOutlinedIcon style={{ color: "white" }} />
                </Box>
              </Box>
              <Box className={classes.description}>
                <Box sx={{ marginTop: "10px" }}>
                  <InfoOutlinedIcon style={{ color: "#A83B65" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                    color: "#A83B65",
                  }}
                >
                  <Box sx={{ fontSize: "20px" }}>Title</Box>
                  <Box sx={{ fontSize: "15px", marginTop: "10px" }}>
                    Alert Content
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Slick;
