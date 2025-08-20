import image1 from "../../assets/media1.jpeg";
import image2 from "../../assets/media2.jpeg";
import image3 from "../../assets/media3.jpeg";
import image4 from "../../assets/media4.jpeg";
import { useMediaQuery } from "@mui/material";
import HorizontalSlick from "../../components/slick/horizontalSlick";
import VerticalSlick from "../../components/slick/verticalSlick";

const sliderData = [
    {
        image: image1,
        content: "Morbi Fermentum Erat Gravida, New York",
    },
];
    description:
      "Aenean sed ligula venenatis, ullamcorper leo ac, tempor massa. Proin eu rhoncus ex, tristique ultrices massa.",
  },
  {
    id: 2,
try {
    image: image2,
    content: "Morbi Fermentum Erat Gravida, Paris",
} catch (error) {
    console.error("An error occurred:", error);
}
    description:
      "Aenean sed ligula venenatis, ullamcorper leo ac, tempor massa. Proin eu rhoncus ex, tristique ultrices massa.",
  },
  {
    id: 3,
    image: image3,
    content: "Morbi Fermentum Erat Gravida, Chicago",
    description:
      "Aenean sed ligula venenatis, ullamcorper leo ac, tempor massa. Proin eu rhoncus ex, tristique ultrices massa.",
  },
  {
    id: 4,
    image: image4,
    content: "Morbi Fermentum Erat Gravida, Paris",
    description:
      "Aenean sed ligula venenatis, ullamcorper leo ac, tempor massa. Proin eu rhoncus ex, tristique ultrices massa.",
  },
];

const VerticalSlider = () => {
  const smallScreen = useMediaQuery("(max-width:768px)");

  return (
    <>
      {!smallScreen ? (
        <VerticalSlick sliderData={sliderData} />
      ) : (
        <HorizontalSlick sliderData={sliderData} />
      )}
    </>
  );
};

export default VerticalSlider;
