import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import * as React from "react";
import defaultImage from "./default.png";
import raquetImage from "./raquet.png";
import Typography from "@mui/material/Typography";
import { FeedItem } from "../../components/FeedItem/feedItem.js";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext/usercontext.js";
import { FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/InputBase";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useCookies } from "react-cookie";

const StyledLabel = styled("p")({
  fontWeight: "bold",
  marginRight: "1vw",
  fontSize: "calc(0.8em + 1vw)",
  margin: "0px",
});

const StyledText = styled("p")({
  fontSize: "calc(0.8em + 1vw)",
  fontWeight: "300",
  margin: "0px",
});

const StyledInput = styled(TextField)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "30vw",
  paddingLeft: "1vw",
});
export const Profile = () => {
  const [cookies, removeCookie] = useCookies([]);
  const { loading, user } = useContext(UserContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  useEffect(() => {
    const isSignedIn = async () => {
   
      if (!loading && !user) { 
        window.location.href = "/";
        alert("Sign in to access profile page!");
      }
    };
    isSignedIn();
  }, [user, loading]);

  const handleClickConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogout = () => {
    removeCookie("token");
    window.location.href = "/";
  };
  const changePassword = async (e) => {
    let response = null;

    try {
      const resp = await axios.post(
        `http://localhost:8000/users/update`,
        {
          Username: user?.Username,
          OldPassword: oldPassword,
          NewPassword: newPassword,
        },
        { withCredentials: true }
      );
      if (resp.data.error) {
        alert(resp.data.error);
      } else {
        console.log(resp.data);
        window.location.reload(false);
      }
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box sx={{ width: "85vw", height: "77.69vh", display: "flex" }}>
      <Box
        sx={{
          height: "77.69vh",
          width: "55vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "55vw",
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2vh",
            display: "flex"
          }}
        >
          <Box
            sx={{
              width: "calc(20em + 1vw)",
              height: "calc(20em + 1vw)",
              justifyContent: "space-between",
              background:
                "linear-gradient(rgba(145, 70, 216, 1), rgba(213, 253, 81, 1))",
              display: "flex",
              alignItems: "center",
              marginRight: "2vw",
              justifyContent: "center",
              borderRadius: "40%",
              marginBottom: "calc(-2.5em + 1vw)"

            }}
          >
            <Box
              component="img"
              sx={{ height: "calc(19.5em + 1vw)", width: "calc(19.em + 1vw)", borderRadius: "40%", display: "flex" }}
              src={defaultImage}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "25em",
              fontWeight: "bold",
              justifyContent: "space-between",
              marginTop: "calc(5em + 1vw)",
            }}
          >
            <Typography
              sx={{
                color: "rgba(145, 70, 216, 1)",
                fontWeight: "bold",
                fontSize: "1.5em",
                fontFamily: "inter",
                marginTop: "calc(-1em + 1vw)"
              }}
            >
              {user?.Username}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <StyledLabel style={{ fontFamily: "Inter", marginRight: "0.25em", fontSize: "1.25em" }}>
                Name:</StyledLabel>
              <StyledText sx={{ fontFamily: "Inter", marginRight: "0.25em", fontSize: "1.25em" }}>
                {`${user?.FirstName} ${user?.LastName}`}</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel style={{ fontFamily: "Inter", marginRight: "0.25em", fontSize: "1.25em" }}>
                ZipCode:</StyledLabel>
              <StyledText sx = {{ fontFamily: "Inter", marginRight: "0.25em", fontSize: "1.25em" }}>
                {user?.ZipCode}</StyledText>
            </Box>
            <Box sx={{ display: "flex", marginBottom: "1em"}}>
              <StyledLabel style={{fontFamily: "Inter", marginRight: "0.25em", fontSize: "1.25em"}}>
                Skill Level:</StyledLabel>
              <StyledText sx = {{ fontFamily: "Inter", marginRight: "0.25em", fontSize: "1.25em" }}>
                {user?.SkillLevel}</StyledText>
            </Box>

            <Box sx={{ display: "flex" }}>
              <StyledLabel style={{ fontFamily: "Inter", fontSize: "1.5em", marginBottom: "0.22em" }}>Change Password:</StyledLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ width: "25vw", marginBottom: "0.5em" }}>
                <StyledLabel style={{ fontFamily: "Inter", fontSize: "1.25em" }} htmlFor="password">
                  Old Password <span style={{ color: "red" }}>*</span>
                  </StyledLabel>
                <StyledInput
                  id="password"
                  borderRadius="20em"
                  placeholder="********"
                  value={oldPassword}
                  onChange={(event) => {
                    setOldPassword(event.target.value);
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
            </Box>
            <Box sx={{ display: "flex", marginBottom: "1em" }}>
              <FormControl sx={{ width: "25vw" }}>
                <StyledLabel style={{ fontFamily: "Inter", fontSize: "1.25em" }} htmlFor="confirmpassword">
                  New Password <span style={{ color: "red" }}>*</span>
                </StyledLabel>
                <StyledInput
                  id="confirmpassword"
                  placeholder="********"
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
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
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  justifySelf: "center",
                  alignSelf: "flex-end",
                  borderRadius: "1em",
                  fontWeight: "bold"
                }}
                color="secondary"
                onClick={changePassword}
              >
                Change Password
              </Button>
            </Box>
            <Box
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
              sx={{ display: "flex" }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  justifySelf: "center",
                  alignSelf: "flex-end",
                  borderRadius: "1em",
                  fontWeight: "bold"
                }}
                color="secondary"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            width: "55vw",
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{ height: "auto", width: "15.5vw" }}
            src={raquetImage}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "13vw",
              fontWeight: "bold",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "rgba(145, 70, 216, 1)",
                fontWeight: "bold",
                fontSize: "calc(0.8em + 1vw)",
              }}
            >
              Your Racket
            </Typography>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Brand: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Model: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Weight: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Strengths: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};