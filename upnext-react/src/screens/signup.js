import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, InputAdornment } from "@mui/material";
import Sidebar from "../components/drawer";
import { ReactComponent as UpnextLogo } from "../assets/Up-Next-Logo-Color 1.svg";
import { ReactComponent as FacebookIcon } from "../assets/bxl-facebook.svg";
import { ReactComponent as TwitterIcon } from "../assets/bxl-twitter.svg";
import { ReactComponent as GoogleIcon } from "../assets/bxl-google.svg";
import { ReactComponent as GitHubIcon } from "../assets/bxl-github.svg";
import Image from "../assets/Crowd2.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "67px",
    marginBottom: "50px",
    "@media (max-width: 768px)": {
      marginLeft: "0px",
      width: "100%",
    },
  },
  customHeading: {
    color: "white",
    fontFamily: "ebgaramondbold",
    letterSpacing: "-3px",
    fontStyle: "normal",
    fontSize: "64px",
    lineHeight: "50px",
    textAlign: "center",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
    "@media (max-width: 300px)": {
      fontSize: "48px",
    },
  },
  resize: {
    "@media (max-width: 300px)": {
      fontSize: "12px !important",
    },
  },
}));

const validationSchema = yup.object({
  username: yup
    .string("")
    .trim()
    .min(5, "Username must be at least 5 characters")
    .max(15, "Username be less than 15 characters")
    .required("Username is required")
    .matches(/^[a-zA-Z_][a-zA-Z0-9_]{2,15}$/, "Enter a valid username"),
  fullName: yup
    .string("")
    .trim()
    .required("Name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Full name should not contain numbers and special character"
    ),
  email: yup
    .string("")
    .trim()
    .required("Email is required")
    .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Enter a valid email address"),
  password: yup
    .string("")
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
  remember: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions."),
});

function Copyright(props) {
  return (
    <Typography align="center" {...props}>
      <FacebookIcon style={{ marginRight: "15px" }} />
      <TwitterIcon style={{ marginRight: "15px" }} />
      <GitHubIcon style={{ marginRight: "15px" }} />
      <GoogleIcon />
    </Typography>
  );
}

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const onSubmit = async (values, action) => {
    localStorage.setItem("user", JSON.stringify(values));
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      remember: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "linear-gradient(180deg, #5ab8eb 0%, #f6adb4 40%, #fee7be 70%, rgba(254, 237, 197, 0.00) 100%)",
        overflowY: "auto",
      }}
    >
      <Sidebar showNav={true} />
      <Box className={classes.container}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            backgroundImage: `url(${Image})`,
            backgroundPosition: "center 2%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 36%",
          }}
        >
          <Box
            sx={{ m: 5, marginTop: "100px" }}
            className={classes.customHeading}
          >
            sign up
          </Box>
          <Box px={2} marginTop="50px">
            <Box
              sx={{
                borderRadius: "5px",
                py: 2,
                px: 5,
                bgcolor: "#184F7B",
                maxWidth: "450px",
              }}
            >
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box sx={{ my: 2 }}>
                  <UpnextLogo />
                </Box>
                <Box>
                  <Typography variant="h6">
                    Entertainment starts here
                  </Typography>
                  <Typography variant="body2">
                    Make live entertainment easy and fun!
                  </Typography>

                  <TextField
                    className={classes.fontSize}
                    margin="normal"
                    fullWidth
                    autoFocus
                    id="username"
                    placeholder="Username"
                    color="secondary"
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username ? formik.errors.username : ""
                    }
                    {...formik.getFieldProps("username")}
                    InputProps={{
                      classes: {
                        input: classes.resize,
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    autoFocus
                    id="email"
                    placeholder="Email"
                    color="secondary"
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? formik.errors.email : ""}
                    {...formik.getFieldProps("email")}
                    InputProps={{
                      classes: {
                        input: classes.resize,
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    placeholder="Full Name"
                    color="secondary"
                    error={
                      formik.touched.fullName && Boolean(formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName ? formik.errors.fullName : ""
                    }
                    {...formik.getFieldProps("fullName")}
                    InputProps={{
                      classes: {
                        input: classes.resize,
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    placeholder="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password ? formik.errors.password : ""
                    }
                    {...formik.getFieldProps("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff
                                style={{
                                  color:
                                    "var(--dark-text-secondary, rgba(231, 227, 252, 0.68))",
                                }}
                              />
                            ) : (
                              <Visibility
                                style={{
                                  color:
                                    "var(--dark-text-secondary, rgba(231, 227, 252, 0.68))",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                      classes: {
                        input: classes.resize,
                      },
                    }}
                    color="secondary"
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="remember"
                          checked={formik.values.remember}
                          onChange={formik.handleChange}
                          color="primary"
                        />
                      }
                    />
                    <Typography
                      variant="body2"
                      marginLeft="-12px"
                      sx={{
                        "@media (max-width: 380px)": {
                          fontSize: "11px !important",
                        },
                      }}
                    >
                      I Agree to
                      <Link
                        target="_blank"
                        href="https://app.termly.io/document/privacy-policy/db9e1926-1806-4255-8915-4000d4ff41d3"
                        variant="body2"
                        sx={{
                          mx: 0.5,
                          textDecoration: "underline",
                          textUnderlineOffset: "3px",
                          whiteSpace: "pre",
                          "@media (max-width: 380px)": {
                            fontSize: "11px !important",
                          },
                        }}
                      >
                        Privacy Policy & Terms
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(formik.errors.remember) && (
                    <Box sx={{ color: "red", fontSize: "14px" }}>
                      {formik.errors.remember}
                    </Box>
                  )}
                  <Button
                    onClick={formik.handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Create an Account
                  </Button>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        "@media (max-width: 380px)": {
                          fontSize: "11px !important",
                        },
                      }}
                    >
                      Already have an account?
                      <Link
                        onClick={() => {
                          navigate("/signin");
                        }}
                        variant="body2"
                        sx={{
                          mx: 0.5,
                          cursor: "pointer",
                          whiteSpace: "pre",
                          "@media (max-width: 380px)": {
                            fontSize: "11px !important",
                          },
                        }}
                      >
                        Sign in instead
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <Divider
                  sx={{ flexGrow: 1, background: "rgba(231, 227, 252, 0.12)" }}
                />
                <Typography variant="body1" sx={{ px: 2 }}>
                  or
                </Typography>
                <Divider
                  sx={{ flexGrow: 1, background: "rgba(231, 227, 252, 0.12)" }}
                />
              </Box>
              <Copyright sx={{ mt: 4, mb: 2 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
