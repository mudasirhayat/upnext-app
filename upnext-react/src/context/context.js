import React, { useState } from "react";
import image from ".././assets/search/Image.png";
import image1 from ".././assets/search/Image1.png";
import image2 from ".././assets/search/Image2.png";
import image3 from ".././assets/search/Image3.png";
import image4 from ".././assets/search/Image4.png";
import image5 from ".././assets/search/Image5.png";

export const AppContext = React.createContext();

const data = [
  {
    id: 1,
    name: "The Vouge",
    image: image,
  },
  {
    id: 2,
    name: "Public School",
    image: image1,
  },
  {
    id: 3,
    name: "The Music Cafe",
    image: image2,
  },
  {
    id: 4,
    name: "Studio 54",
    image: image3,
  },
  {
    id: 5,
    name: "Club IV",
    image: image4,
  },
  {
    id: 6,
    name: "Ark",
    image: image5,
  },
];

function AppContextProvider(props) {
  const [search, setSearch] = useState(data);
  const [bookings, setBookings] = useState(0);

  return (
    <AppContext.Provider
      value={{ data, search, setSearch, bookings, setBookings }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
