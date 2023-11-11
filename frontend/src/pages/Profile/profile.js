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
import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
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
  const user = useContext(UserContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          }}
        >
          <Box
            sx={{
              width: "15.5vw",
              height: "15.5vw",
              background:
                "linear-gradient(rgba(145, 70, 216, 1), rgba(213, 253, 81, 1))",
              display: "flex",
              alignItems: "center",
              marginRight: "2vw",
              justifyContent: "center",
              borderRadius: "40%",
            }}
          >
            <Box
              component="img"
              sx={{ height: "15vw", width: "15vw", borderRadius: "40%" }}
              src={defaultImage}
            />
          </Box>
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
              {user?.Username}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Name: </StyledLabel>
              <StyledText>{`${user?.FirstName} ${user?.LastName}`}</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>ZipCode: </StyledLabel>
              <StyledText>{user?.ZipCode}</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Skill Level:</StyledLabel>
              <StyledText>{user?.SkillLevel}</StyledText>
            </Box>

            <Box sx={{ display: "flex" }}>
              <StyledLabel>Change Password:</StyledLabel>
            </Box>
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ width: "30vw" }}>
                <StyledLabel htmlFor="password">Old Password</StyledLabel>
                <StyledInput
                  id="password"
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
            <Box sx={{ display: "flex" }}>
              <FormControl sx={{ width: "30vw" }}>
                <StyledLabel htmlFor="confirmpassword">
                  New Password
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
                }}
                color="secondary"
                onClick={changePassword}
              >
                Change Password
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
