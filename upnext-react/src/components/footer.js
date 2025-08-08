import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
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
    display: "flex",
    padding: "50px",
    justifyContent: "end",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <img src={logo} alt="upnextlogo" height="40" width="154" />
    </Box>
  );
};

export default Footer;
