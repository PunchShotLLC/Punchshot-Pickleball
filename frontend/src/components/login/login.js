import logo from "../../assets/images/logo.svg";
import "./login.scss";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import x_button from "../../assets/images/x_button.svg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "@mui/material/styles";

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

const StyledInput = styled(TextField)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "100%",
  paddingLeft: "1vw",
});

export const Login = (props) => {
  // const { dispatch } = useAuthContext()
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (e) => {
    console.log(Username);
    console.log(Password);
    let response = null;

    try {
      const resp = await axios.post(
        `http://localhost:8000/users/login`,
        {
          Username,
          Password,
        },
        { withCredentials: true }
      );
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        console.log(resp.data);
        window.location.reload(false);
      }
      // console.log(response)
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCreate = async (e) => {
    // trigger signup popup
    props.setRender(false);
    props.setRenderSignup(true);
    e.preventDefault();
  };

  if (props.render === true) {
    return (
      <ThemeProvider theme={buttonTheme}>
        <Box
          sx={{
            width: "30vw",
            height: "30vw",
            background: "white",
            borderRadius: "calc(0.1em + 1vw)",
            position: "absolute",
            left: "34.4vw",
            top: "22.22vh",
            zIndex: "5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "30vw",
              height: "2vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <img
              className="login_x_button"
              src={x_button}
              onClick={() => props.setRender((oldRender) => !oldRender)}
            ></img>
          </Box>
          <img className="login_logo_image" src={logo}></img>
          <Typography align="center" sx={{ position: "relative" }}>
            Log into your account, or sign up here!
          </Typography>
          <div className="login_input">
            <StyledInput
              id="username"
              placeholder="john123"
              value={Username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
          </div>
          <div className="login_input">
            <StyledInput
              id="password"
              placeholder="********"
              value={Password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <Box
            sx={{
              width: "25vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "1vh",
            }}
          >
            <Button
              onClick={handleCreate}
              variant="contained"
              color="secondary"
              sx={{
                position: "relative",
                borderRadius: "calc(0.1em + 0.5vw)",
                pl: "calc(1.8vw)",
                pr: "calc(1.8vw)",
                width: "11vw",
                height: "2vw",
                fontSize: "calc(0.8vh + 0.29em)",
              }}
            >
              Create Account
            </Button>
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              sx={{
                position: "relative",
                borderRadius: "calc(0.1em + 0.5vw)",
                pl: "calc(4vw)",
                pr: "calc(4vw)",
                width: "11vw",
                height: "2vw",
                fontSize: "calc(0.8vh + 0.29em)",
              }}
            >
              Sign In
            </Button>
          </Box>
          <Link color="primary" sx={{ marginTop: "2vh" }}>
            Forgot Password?
          </Link>
        </Box>
        <Box
          sx={{
            zIndex: "3",
            minWidth: "100vw",
            minHeight: "100vh",
            backgroundColor: "lightgray",
            opacity: "0.8",
            position: "absolute",
          }}
        ></Box>
      </ThemeProvider>
    );
  }
};
