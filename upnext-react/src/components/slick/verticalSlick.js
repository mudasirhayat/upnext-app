import { Box, useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const VerticalSlick = ({ sliderData }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedContent, setSelectedContent] = useState(sliderData[0].content);
  const [selectedImage, setSelectedImage] = useState(sliderData[0].image);
  const isMobile = useMediaQuery("(max-width:1080px)");

  const handleScrollDown = () => {
    if (sliderRef.current) {
      sliderRef.current.slideNext();
    }
  };

  const handleGoPrev = () => {
    if (sliderRef.current) {
      const newIndex = currentSlide - 1;

      if (newIndex >= 0) {
        sliderRef.current.slidePrev();
        setCurrentSlide(newIndex);
        setSelectedContent(sliderData[newIndex].content);
        setSelectedImage(sliderData[newIndex].image);
      }
    }
  };

  const handleGoNext = () => {
    if (sliderRef.current) {
      const newIndex = currentSlide + 1;

      if (newIndex < sliderData.length) {
        sliderRef.current.slideNext();
        setCurrentSlide(newIndex);
        setSelectedContent(sliderData[newIndex].content);
        setSelectedImage(sliderData[newIndex].image);
      }
    }
  };

  const handleSlideSelect = (index) => {
    const { image, content } = sliderData[index];
    setCurrentSlide(index);
    setSelectedContent(content);
    setSelectedImage(image);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "85%",
          maxWidth: "1040px",
          padding: "20px 20px 0px",
          backgroundColor: "#A83B65",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              width: "160%",
              backgroundColor: "#A83B65",
              flexDirection: "column",
            }}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: "100%",
                maxWidth: "1080px",
                borderRadius: "6px",
              }}
            />
            <p
              style={{
                color: "white",
                margin: "10px 0",
                fontSize: "32px",
              }}
            >
              {selectedContent}
            </p>
            <p style={{ color: "white", fontSize: "16px" }}>
              Aenean sed ligula venenatis, ullamcorper leo ac, tempor massa.
              Proin eu rhoncus ex, tristique ultrices massa.
            </p>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "40%",
              marginLeft: "10px",
              height: isMobile ? "450px" : "500px",
            }}
          >
            <Swiper
              direction={"vertical"}
              slidesPerView={3}
              slidesPerGroup={1}
              spaceBetween={10}
              mousewheel={true}
              onSlideChange={(swiper) => {
                setCurrentSlide(swiper.activeIndex);
                setSelectedContent(sliderData[swiper.activeIndex].content);
                setSelectedImage(sliderData[swiper.activeIndex].image);
              }}
              onSwiper={(swiper) => (sliderRef.current = swiper)}
              pagination={{ clickable: true }}
            >
              {sliderData.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => handleSlideSelect(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <Box>
                      <img
                        src={item.image}
                        alt={`${item.id}`}
                        width={isMobile ? "141px" : "200px"}
                        height="auto"
                        style={{ borderRadius: "6px" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          color: "white",
                          marginTop: "5px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "17px",
                          letterSpacing: "0.15px",
                        }}
                      >
                        {item.content}
                      </p>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
        <Box sx={{ display: "flex", height: "50px" }}>
          <Box
            sx={{
              display: "flex",
              width: "140%",
              backgroundColor: "#A83B65",
              flexDirection: "row",
              justifyContent: "space-between",
              color: "white",
              fontSize: "22px",
              textDecoration: "underline",
            }}
          >
            <Box
              onClick={handleGoPrev}
              sx={{
                marginTop: "-3px",
                cursor: "pointer",
                opacity: currentSlide === 0 ? 0.5 : 1,
              }}
              disabled={currentSlide === 0}
            >
              {"<< Prev"}
            </Box>
            <Box
              sx={{
                marginTop: "-3px",
                marginRight: "20px",
                cursor: "pointer",
                opacity: currentSlide === sliderData.length - 1 ? 0.5 : 1,
              }}
              onClick={handleGoNext}
              disabled={currentSlide === sliderData.length - 1}
            >
              {"Next >>"}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40%",
              backgroundColor: "#EAA4AF",
              borderEndEndRadius: "10px",
              height: "30px",
              marginTop: "20px",
              marginRight: "-21px",
              cursor: "pointer",
            }}
            onClick={handleScrollDown}
          >
            <span>
              <ArrowDropDownOutlinedIcon
                style={{ color: "#A83B65", transform: "scale(3, 2)" }}
              />
            </span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VerticalSlick;
