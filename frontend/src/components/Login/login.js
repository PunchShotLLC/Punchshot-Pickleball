import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import x_button from "../../assets/images/x_button.svg";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import axios from "axios";

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#9146D8",
    },
    secondary: {
      main: "#D9D9D9",
    },
  },
});

const StyledForm = styled(Box)({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "35vw",
  maxWidth: "600px",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 5,
});

const Backdrop = styled(Box)({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.5)", // Dark overlay
  zIndex: 4, // Ensure backdrop is below the modal but above everything else
});

export const Login = (props) => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:8000/users/login`,
        { Username, Password },
        { withCredentials: true }
      );
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        console.log(resp.data);
        window.location.reload(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    props.setRender(false);
    props.setRenderSignup(true);
  };

  if (!props.render) {
    return null;
  }
  return (
    <ThemeProvider theme={buttonTheme}>
      {props.render && <Backdrop />}
      <StyledForm>
        <IconButton
          onClick={() => props.setRender((oldRender) => !oldRender)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <img src={x_button} alt="Close" />
        </IconButton>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        </Box>
        <Typography align="center">
          Log into your account, or sign up here!
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={Username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={Password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
            gap: "16px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreate}
            sx={{ width: "calc(50% - 8px)" }} // Adjust this calculation if the gap size changes
          >
            Create Account
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ width: "calc(50% - 8px)" }} // Same here for consistency
          >
            Sign In
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <Link href="#" color="primary">
            Forgot Password?
          </Link>
        </Box>
      </StyledForm>
    </ThemeProvider>
  );
};
