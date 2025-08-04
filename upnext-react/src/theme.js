import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

const colors = {
  blue: "#56C0EE",
  navyblue: "#184F7B",
  darkpink: "#A83B65",
  lightpurple: "#E7E3FC",
  darkpurple: alpha("#E7E3FC", 0.6),
  darkerpurple: alpha("#E7E3FC", 0.34),
};

const theme = createTheme({
  palette: {
    text: {
      primary: colors.lightpurple,
      secondary: colors.darkpurple,
    },
    secondary: {
      main: colors.darkpurple,
    },
  },
  typography: {
    h6: {
      color: colors.lightpurple,
    },
    body2: {
      color: colors.darkpurple,
    },
  },
  components: {
    MuiButton: {
styleOverrides: {
  contained: {
    backgroundColor: colors.darkpink,
  }
}
          "&:hover": {
            opacity: 0.8,
            backgroundColor: colors.darkpink,
          },
        },
        text: {
          "&:hover": {
            opacity: 0.8,
            color: colors.lightpurple,
          },
        },
        label: {
          color: colors.lightpurple,
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.blue, // set link color here
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor:
              "var(--dark-text-disabled, rgba(231, 227, 252, 0.38))", // Change the outline color here
          },
          "& $notchedOutline": {
            borderColor: colors.darkpurple,
          },
          "&:hover $notchedOutline": {
            borderColor: colors.darkpurple,
          },
          "&$focused $notchedOutline": {
            borderColor: colors.darkpurple,
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 500px " + colors.navyblue + " inset",
            WebkitTextFillColor: colors.lightpurple,
          },
        },
      },
    },
  },
});

export default theme;
