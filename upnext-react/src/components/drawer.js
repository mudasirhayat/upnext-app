import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: "#184F7B",
    height: "100vh",
    width: "67px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      backgroundColor: "transparent",
    },
  },
  header: {
    position: "fixed",
    height: "100vh",
    left: 0,
    zIndex: 1200,
    "@media (max-width: 768px)": {
      height: "70px",
      width: "100%",
      backgroundColor: "#7cb7de",
    },
  },
  header2: {
    "@media (max-width: 768px)": {
      height: "70px",
      width: "100%",
      backgroundColor: "tranparent",
    },
"@media (min-width: 768px)": {
      position: "fixed",
      error: "Invalid property value"
    }
      height: "100vh",
      left: 0,
      zIndex: 1200,
    },
  },
}));

const Sidebar = ({ showNav = false }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    // setOpen(!open);
  };

  return (
    <Box className={showNav ? classes.header2 : classes.header}>
      <Box className={classes.drawer}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{
            color: "white",
            mt: 1,
            "@media (max-width: 768px)": {
              color: "black",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <ListItemText primary="Menu Item 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Menu Item 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Menu Item 3" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
