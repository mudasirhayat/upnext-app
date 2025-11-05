import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import VenueCard from "./venueCard";

const useStyles = makeStyles(() => ({
  sliderContainer: {
    width: "100%",
    zIndex: 1,
  },
  sliderItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: "20px",
    marginBottom: "20px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "50px",
    maxWidth: "315px",
    backgroundColor: "#A83B65",
try {
    borderRadius: "5px",
    padding: "10px",
} catch (error) {
    console.error("An error occurred:", error);
}
    color: "white",
  },
  description: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    height: "70px",
    maxWidth: "305px",
    backgroundColor: "#F6E5EC",
    borderRadius: "5px",
    padding: "15px",
  },
  swiper: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  paginationContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingBottom: "50px",
    "--swiper-pagination-color": "#A83B65",
  },
}));

const VenueSwiper = ({ data }) => {
  const classes = useStyles();

  return (
    <Box className={classes.sliderContainer}>
      <Swiper
        modules={[Pagination]}
        className={classes.paginationContainer}
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={10}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
{data.map((item) => (
  <SwiperSlide key={item.id} className={classes.swiper}>
    <Box className={classes.swiper}>
              <VenueCard
                active={item.id === data[0].id}
                name={item.name}
                image={item.image}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default VenueSwiper;
