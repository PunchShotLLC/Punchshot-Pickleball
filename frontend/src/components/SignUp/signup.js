import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import logo from "../../assets/images/logo.svg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/InputBase";
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

const StyledInput = styled(TextField)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "30vw",
  paddingLeft: "1vw",
});

const StyledSelect = styled(Select)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  height: "5h",
  width: "30vw",
  paddingLeft: "1vw",
  bottom: "1em",
});

const StyledLabel = styled("label")({
  paddingLeft: "1vw",
  marginBottom: "0.5vh",
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

    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Username', username);
    formData.append('Name', name);
    formData.append('Sex', sex);
    formData.append('Password', password);
    formData.append('ZipCode', zipCode);
    formData.append('SkillLevel', skillLevel);

    const resp = await axios.post(
      `http://localhost:8000/users/signup`,
      formData,
      { withCredentials: true },
    );
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

  return (
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
          width: "80vw",
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
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%"}}>
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
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="email">
              Email<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </FormControl>
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="name">
              Name<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="name"
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
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="username">
              Username<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="username"
              placeholder="JohnDoe"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              required
            />
          </FormControl>
          {/* <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="sex">
              Sex<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="sex"
              placeholder="Male/Female"
              value={sex}
              onChange={(event) => {
                setSex(event.target.value);
              }}
              required
            />
          </FormControl> */}
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="sex">
              Sex<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledSelect
              variant="standard"
              disableUnderline
              id="sex"
              value={sex}
              onChange={handleSexChange}
              placeholder="Male, Female"
              required
            >
              <MenuItem key="Male" value="Male">
                Male
              </MenuItem>
              <MenuItem key="Female" value="Female">
                Female
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="password">
              Password<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="password"
              placeholder="********"
              value={password}
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
          </FormControl>
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="zipcode">
              Zip Code<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="zipcode"
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
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="confirmpassword">
              Confirm Password<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              id="confirmpassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              required
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="skillevel">
              Skill Level<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledSelect
              variant="standard"
              disableUnderline
              id="skilllevel"
              value={skillLevel}
              onChange={handleSkillChange}
              placeholder="Novice, Intermediate, Advanced"
              required
            >
              <MenuItem key="Novice" value="Novice">
                Novice
              </MenuItem>
              <MenuItem key="Intermediate" value="Intermediate">
                Intermediate
              </MenuItem>
              <MenuItem key="Advanced" value="Advanced">
                Advanced
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
        {/* <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="bio">Bio</StyledLabel>
                        <StyledInput multiline rows={4} sx={{width: "65vw"}} id="bio" placeholder="John Doe is an avid pickleball athlete, competing in open tournaments in the greater Atlanta area since 2013. His favorite place to play is in his hometown, Portland. He’s looking forward to competing against you!  " />
                    </FormControl>
                </Box> */}
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
        {/* <Box height="10vh" sx={{display:"flex"}}>
                    <img src={defaultImage} width="auto" height="100%" style={{borderRadius:"50%", border:"3px solid #000000"}}/>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"flex-end", marginLeft:"1vw"}}>
                        <StyledLabel htmlFor="file">Profile Photo</StyledLabel>
                        <Button component="label" variant="contained" sx={{height:"50%", backgroundColor:"black", borderRadius: '1em'}}>
                            Select Photo
                            <input type="file" accept="image/*" hidden id="file" />
                        </Button>
                    </Box>
                </Box> */}
      </form>
    </Box>
  );
};
