import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderRadius: "100px",
    justifyContent: "space-between",
    maxWidth: "1080px",
    width: "95%",
    "@media (max-width: 768px)": {
      width: "80%",
    },
    backgroundColor: "#A83B65",
    padding: "8px",
  },
  filterButton: {
    flex: "1",
    borderRadius: "30px !important",
    backgroundColor: "#184F7B !important",
    marginLeft: "10px !important",
    "@media (max-width: 768px)": {
      fontSize: "10px !important",
    },
  },
  searchInput: {
    flex: "7",
    marginRight: "20px",
    borderRadius: "100px",
    backgroundColor: "#D9D9D9",
    overflow: "hidden",
  },
  icon: {
    "@media (max-width: 768px)": {
      fontSize: "16px !important",
    },
  },
  searchContainer: {
    display: "flex",
    width: "100%",
    alignItems: "end",
    flexDirection: "column",
    position: "relative",
  },
  results: {
    backgroundColor: "white",
    width: "82%",
    "@media (max-width: 560px)": {
      marginLeft: "-100px",
      width: "120%",
    },
    "@media (max-width: 320px)": {
      marginLeft: "-100px",
      width: "150%",
    },
    cursor: "pointer",
    fontFamily: "montesserat",
    fontSize: "20px",
  },
  container: {
    position: "absolute",
    zIndex: 2,
    width: "95%",
    marginTop: "56px",
  },

  mobileSearchContainer: {},
}));

const MobileSearchBar = ({
  searchQuery,
  handleSearch,
  searchResults,
  handleSearchClick,
  show,
  setShow,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(show);

  const toggleDrawer = () => {
    setOpen(!open);
    setShow(!show);
  };

  return (
    <>
      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <Box sx={{ height: "120px", background: "#A83B65" }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              mt: 5,
            }}
          >
            <TextField
              sx={{
                width: "80%",
                ml: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Change the outline color here
                  },
                  "&:hover fieldset": {
                    borderColor: "white", // Change the outline color on hover here
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white", // Change the outline color on focus here
                  },
                  "&.Mui-focused label": {
                    color: "white", // Change the label color on focus here
                  },
                },
              }}
              placeholder="Search..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: "white" }} />
                  </InputAdornment>
                ),
                style: { color: "white" },
              }}
            />
            <Box
              sx={{
                display: "flex",
                width: "20%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                m: 2,
              }}
            >
              <Button
                className={classes.filterButton}
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: 2,
                }}
              >
                <FilterAltIcon className={classes.icon} /> Filter
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1500,
          top: 120,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 1)",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {searchResults.map((item) => (
          <div key={item.id} onClick={() => handleSearchClick(item.id)}>
            <Box sx={{ display: "flex", p: 2, alignItems: "center" }}>
              <Avatar alt={item.name} src={item.image} />
              <Box sx={{ ml: 2 }}>{item.name}</Box>
            </Box>
            <Divider variant="middle" />
          </div>
        ))}
      </Box>
    </>
  );
};

const DesktopSearchBar = ({
  bgEnable,
  searchQuery,
  handleSearch,
  searchResults,
  handleSearchClick,
  show,
}) => {
  const classes = useStyles();

  return (
    <>
<Box className={classes.searchContainer}>
    className={classes.root}
    sx={{
        backgroundColor: bgEnable ? "#A83B65" : "transparent"
    }}
/>
        >
          {!bgEnable && (
            <Box
              sx={{
                width: "38px",
                height: "38px",
                borderRadius: "28.5px",
                background: "#A83B65",
                marginRight: "6.5px",
              }}
            />
          )}
          <TextField
            sx={{ border: "none", "& fieldset": { border: "none" } }}
            className={classes.searchInput}
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            className={classes.filterButton}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            <FilterAltIcon className={classes.icon} /> Filter
          </Button>
        </Box>
        <Box className={classes.container}>
          <Box className={classes.results}>
            {searchResults.map((item) => (
              <div key={item.id} onClick={() => handleSearchClick(item.id)}>
                <Box sx={{ display: "flex", p: 2, alignItems: "center" }}>
                  <Avatar alt={item.name} src={item.image} />
                  <Box sx={{ ml: 2 }}>{item.name}</Box>
                </Box>
                <Divider variant="middle" />
              </div>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const SearchBar = ({ show, setShow, bgEnable = true }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setSearch } = useContext(AppContext);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data } = useContext(AppContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value !== "") {
      let filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (filteredData.length === 0) {
        filteredData = [{ id: "x", name: "No venue found", image: "" }];
      }
      setSearchResults(filteredData);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchClick = (id) => {
    if (id !== "x") {
      const selectedItem = data.find((item) => item.id === id);
      if (selectedItem) {
        const filteredItems = data.filter((item) => item.id !== id);
        setSearch([selectedItem, ...filteredItems]);
      }
      setSearchResults([]);
      navigate("/venue");
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileSearchBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          searchResults={searchResults}
          handleSearchClick={handleSearchClick}
          show={show}
          setShow={setShow}
        />
      ) : (
        <DesktopSearchBar
          bgEnable={bgEnable}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          searchResults={searchResults}
          handleSearchClick={handleSearchClick}
        />
      )}
    </>
  );
};

export default SearchBar;
