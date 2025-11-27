import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination } from "swiper/modules";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const useStyles = makeStyles(() => ({
  sliderContainer: {
    width: "100%",
  },
  sliderItem: {
display: "flex",
flexDirection: "column",
alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    margin: "0px 20px",
  },
  description: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    height: "70px",
    width: "100%",
    maxWidth: "305px",
    background: "#E4F1FF",
    borderRadius: "5px",
    padding: "15px",
  },
  paginationContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingBottom: "10px",
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
  {
    id: 5,
    priority: "HIGH",
    content: "sample text for slider",
  },
  {
    id: 6,
    priority: "HIGH",
    content: "sample text for slider",
  },
  {
    id: 7,
    priority: "HIGH",
    content: "sample text for slider",
  },
];

const Notifications = ({ setShowTitle }) => {
  const classes = useStyles();

  return (
    <Box className={classes.sliderContainer}>
      <Swiper
        breakpoints={{
          280: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          460: {
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
        modules={[Pagination]}
        className={classes.paginationContainer}
        pagination={{
          dynamicBullets: true,
        }}
        initialSlide={0}
      >
{sliderData.map((item) => (
  <SwiperSlide key={item.id}>
    {item ? (
      // Render item content here
    ) : (
      // Handle error here
    )}
  </Swiper
            <Box className={classes.sliderItem}>
              <Box className={classes.description}>
                <Box sx={{ marginTop: "10px" }}>
                  <InfoOutlinedIcon style={{ color: "#55ACEE" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "10px",
                    color: "#55ACEE",
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

export default Notifications;
