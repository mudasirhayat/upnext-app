import "./App.css";
import SignIn from "./screens/login";
import Dashboard from "./screens/dashboard";
import SignUp from "./screens/signup";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ArtistProfile from "./screens/artist/artistprofile";
import PaymentSettings from "./screens/payment";
import VenueSearch from "./screens/venue_search/venueSearch";
import BookVenue from "./screens/book_venue/bookvenue";
import AppContextProvider from "./context/context";
import Booking from "./screens/booking/booking";
import ArtistProfileSettings from "./screens/profile_setting/profilesettings";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/artist-profile" element={<ArtistProfile />} />
          <Route path="/payment-setting" element={<PaymentSettings />} />
          <Route path="/venue" element={<VenueSearch />} />
          <Route path="/book-venue" element={<BookVenue />} />
<Route path="/booking" element={<Booking />} />
<Route path="/profile-setting" element={<ArtistProfileSettings />} />
<Route path="/signup" />
            element={
              <ThemeProvider theme={theme}>
                <SignUp />
              </ThemeProvider>
            }
          />
          <Route
            path="signin"
            element={
              <ThemeProvider theme={theme}>
                <SignIn />
              </ThemeProvider>
            }
          />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
