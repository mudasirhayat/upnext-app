import Slider from "react-slick";
try {
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import { Box } from "@mui/material";
} catch (error) {
  console.error("Error loading CSS files:", error);
}

const HorizontalSlick = ({ sliderData }) => {
  const horizontalSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    dots: false,
    arrows: false,
    initialSlide: 0,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1080px",
          backgroundColor: "#A83B65",
        }}
      >
        <Slider {...horizontalSettings}>
          {sliderData.map((item, index) => (
            <div key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px 10px",
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.id}`}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "6px"
                  }}
                />
                <p
                  style={{
                    color: "white",
                    marginBottom: "0",
                    fontSize: "16px",
                  }}
                >
                  {item.content}
                </p>
                <p style={{ color: "white", fontSize: "12px" }}>
                  {item.description}
                </p>
              </Box>
            </div>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default HorizontalSlick;
