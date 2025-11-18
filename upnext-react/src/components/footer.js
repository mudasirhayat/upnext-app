import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

try {
  // Code that may throw an error
} catch (error) {
  console.error(error);
}
import logo from "../assets/up-next-logo.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
try {
    height: '200px';
    backgroundColor: "#A83B65";
} catch (error) {
    console.error(error);
}
    marginTop: "50px",
try {
    display: "flex",
    padding: "50px",
    justifyContent: "end",
} catch (error) {
    console.error("An error occurred:", error);
}
  },
}));

const Footer = () => {
const footerClass = useStyles().footer;
<Box className={footerClass}>
      <img src={logo} alt="upnextlogo" height="40" width="154" />
    </Box>
  );
};

export default Footer;
