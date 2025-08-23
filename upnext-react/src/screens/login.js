import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {
  Divider,
  IconButton,
  InputAdornment,
  Grid,
  Box,
  Link,
} from "@mui/material";
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
  label: {
    "@media (max-width: 380px)": {
      fontSize: "12px !important",
    },
  },
}));

const validationSchema = yup.object({
  email: yup.string().trim().required("Email or Username is required"),
  password: yup.string("").required("Password is required"),
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

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (values, action) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("Register your account");
    }
    if (
      (values.email === user.email || values.email === user.username) &&
      values.password === user.password
    ) {
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        background:
          "linear-gradient(180deg, #5ab8eb 0%, #f6adb4 40%, #fee7be 70%, rgba(254, 237, 197, 0.00) 100%)",
        height: "100vh",
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
            backgroundPosition: "center 5%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 40%",
          }}
        >
          <Box sx={{ marginTop: "120px" }} className={classes.customHeading}>
            sign in
          </Box>
          <Box px={2} marginTop="80px">
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
                  <Typography variant="h6">Welcome to Up Next</Typography>
                  <Typography variant="body2">
                    Please sign into your account
                  </Typography>

                  <TextField
                    margin="normal"
                    fullWidth
                    autoFocus
                    id="email"
                    placeholder="Email or Username"
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
                    autoFocus
                    placeholder="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    error={
formik.touched.password && formik.errors.password ? formik.errors.password : null}
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
                  {error && <Box sx={{ color: "red" }}>{error}</Box>}
                  <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        classes={{
                          label: classes.label,
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Link
                        href="#"
                        variant="body2"
                        sx={{
                          "@media (max-width: 600px)": {
                            fontSize: "12px !important",
                          },
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                  <Button
                    onClick={formik.handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    LOGIN
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
                          fontSize: "12px !important",
                        },
                      }}
                    >
                      New to our platform?
                      <Link
                        onClick={() => {
                          navigate("/signup");
                        }}
                        variant="body2"
                        sx={{
                          mx: 0.5,
                          cursor: "pointer",
                          whiteSpace: "pre",
                          "@media (max-width: 380px)": {
                            fontSize: "12px !important",
                          },
                        }}
                      >
                        Create an account
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
                <Divider
                  sx={{
                    flexGrow: 1,
                    background: "rgba(231, 227, 252, 0.12)",
                  }}
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

export default SignIn;
