import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import logo from "../../assets/images/logo.svg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import x_button from "../../assets/images/x_button.svg";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import defaultImage from "../../pages/Profile/default.png";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SelectInput from "@mui/material/Select/SelectInput";

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

export const SignUp = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    if (
      name === "" ||
      sex === "" ||
      username === "" ||
      zipCode === "" ||
      skillLevel === "" ||
      email === "" ||
      password === ""
    ) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const body = {
      Email: email,
      Username: username, // store admin details in file
      Name: name, // store admin details in file
      Sex: sex,
      Password: password,
      ZipCode: zipCode,
      SkillLevel: skillLevel,
    };

    const resp = await axios.post(`http://localhost:8000/users/signup`, body, {
      withCredentials: true,
    });
    if (resp.data.error) {
      alert(resp.data.error);
    } else {
      window.location.reload(false);
    }
  };

  const handleSkillChange = (event) => {
    setSkillLevel(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const Backdrop = styled(Box)({
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 4,
  });

  return (
    <>
      {props.render && <Backdrop />}
    <Box
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          width: "45vw",
          height: "70vh",
          background: "white",
          borderRadius: "calc(0.1em + 1vw)",
          border: "1px solid black",
          zIndex: "5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <img
            className=".login_x_button"
            style={{ marginTop: "1vw", marginRight: "1vw" }}
            src={x_button}
            onClick={() => props.setRender((oldRender) => !oldRender)}
          ></img>
        </Box>
        <img height="20%" width="auto" src={logo}></img>
        <Box
          sx={{
            width: "35vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >

      <FormControl sx={{ width: "15vw" }}>
            <TextField
              id="email"
              label="Email"
              placeholder="email@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
              
            />
          </FormControl>

          <FormControl sx={{ width: "15vw" }}>
            <TextField
              id="name"
              label="Name"
              placeholder="John Doe"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            width: "35vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "15vw" }}>
            <TextField
              id="username"
              label="Username"
              placeholder="JohnDoe"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
          </FormControl>

          <FormControl variant="outlined" sx={{ width: "15vw" }}>
            <InputLabel htmlFor="sex" shrink>
              Sex
            </InputLabel>
            <Select
              labelId="sex-select-label"
              id="sex"
              value={sex}
              onChange={handleSexChange}
              label="Sex" // Important for spacing the outline correctly.
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem disabled value="">
                Please select a gender
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: "35vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "15vw" }}>
            <TextField
              id="password"
              label="Password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </FormControl>
          <FormControl sx={{ width: "15vw" }}>
            <TextField
              id="zipcode"
              label="Zipcode"
              value={zipCode}
              onChange={(event) => {
                setZipCode(event.target.value);
              }}
              placeholder="30332"
              required
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            width: "35vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "15vw" }}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              placeholder="********"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              required
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </FormControl>

          <FormControl variant="outlined" sx={{ width: "15vw" }}>
            <InputLabel htmlFor="Skill Level" shrink>
              Skill Level
            </InputLabel>
            <Select
              labelId="skill-select-label"
              id="skilllevel"
              value={skillLevel}
              onChange={handleSkillChange}
              label="Skill Level" // Important for spacing the outline correctly.
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              variant="outlined"
            >
              <MenuItem disabled value="">
                Please select a skill level
              </MenuItem>
              <MenuItem key="Novice" value="Novice">
                Novice
              </MenuItem>
              <MenuItem key="Intermediate" value="Intermediate">
                Intermediate
              </MenuItem>
              <MenuItem key="Advanced" value="Advanced">
                Advanced
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", height: "10vh" }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              height: "50%",
              alignSelf: "flex-end",
              borderRadius: "1em",
            }}
            color="secondary"
            onClick={onClickSignUp}
          >
            Create Account
          </Button>
        </Box>
      </form>
    </Box>
    </>
  );
};
