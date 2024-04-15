import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import KeyIcon from "@mui/icons-material/Key";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../../components/UserContext/usercontext";
import { LeagueComp } from "../../components/LeagueComp/LeagueComp.js";
import { CreateLeague } from "../../components/LeagueComp/CreateLeague.js";
import axios from "axios";
import { display } from "@mui/system";

const StyledInput = styled(InputBase)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  paddingLeft: "1vw",
  paddingRight: "48px", // Make room for the icon button on the right
  width: "100%", // Ensure the input stretches to fill the flex container
});

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

export const League = () => {
  const [leagues, setLeagues] = useState(null);
  const [allLeagues, setAllLeagues] = useState(null);
  const { user, loading } = useContext(UserContext);
  const [renderCreateLeague, setRenderCreateLeague] = useState(false);
  const [searchLeagueName, setSearchLeagueName] = useState("");
  const [checkedNovice, setCheckedNovice] = React.useState(true);
  const [checkedIntermediate, setCheckedIntermediate] = React.useState(true);
  const [checkedAdvanced, setCheckedAdvanced] = React.useState(true);
  const [checkedMale, setCheckedMale] = React.useState(true);
  const [checkedFemale, setCheckedFemale] = React.useState(true);
  const [checkedMixed, setCheckedMixed] = React.useState(true);
  const [searchPrivate, setSearchPrivate] = React.useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
      alert("Sign in to access leagues page!");
    } else {
      getLeagues();
    }
  }, [user, loading, navigate]);

  const getLeagues = async (leagueName) => {
    try {
      const url = `http://localhost:8000/leagues/${
        leagueName ? leagueName : ""
      }`;
      const response = await axios.get(url);
      const filteredLeagues = response.data.filter((league) => {
        console.log(league);
        if (
          ((checkedNovice && league.SkillLevel === "Novice") ||
            (checkedIntermediate && league.SkillLevel === "Intermediate") ||
            (checkedAdvanced && league.SkillLevel === "Advanced")) &&
          ((checkedMale && league.Division === "Male") ||
            (checkedFemale && league.Division === "Female") ||
            (checkedMixed && league.Division === "Mixed"))
        ) {
          return true;
        }
        return false;
      });

      console.log(filteredLeagues);
      setLeagues(filteredLeagues);
      setAllLeagues(response.data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
      alert("Failed to fetch leagues");
    }
  };

  const handleChangeNovice = (event) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    setCheckedNovice(event.target.checked);
    const filteredLeagues = allLeagues.filter((league) => {
      console.log(league);
      if (
        ((event.target.checked && league.SkillLevel === "Novice") ||
          (checkedIntermediate && league.SkillLevel === "Intermediate") ||
          (checkedAdvanced && league.SkillLevel === "Advanced")) &&
        ((checkedMale && league.Division === "Male") ||
          (checkedFemale && league.Division === "Female") ||
          (checkedMixed && league.Division === "Mixed"))
      ) {
        return true;
      }
      return false;
    });
    console.log(filteredLeagues);
    setLeagues(filteredLeagues);
  };

  const handleChangeIntermediate = (event) => {
    // console.log(event.target.checked);
    // console.log(event.target.name);
    setCheckedIntermediate(event.target.checked);
    console.log(event.target.checked);
    const filteredLeagues = allLeagues.filter((league) => {
      if (
        ((checkedNovice && league.SkillLevel === "Novice") ||
          (event.target.checked && league.SkillLevel === "Intermediate") ||
          (checkedAdvanced && league.SkillLevel === "Advanced")) &&
        ((checkedMale && league.Division === "Male") ||
          (checkedFemale && league.Division === "Female") ||
          (checkedMixed && league.Division === "Mixed"))
      ) {
        return true;
      }
      return false;
    });
    console.log(leagues);
    setLeagues(filteredLeagues);
  };

  const handleChangeAdvanced = (event) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    setCheckedAdvanced(event.target.checked);
    const filteredLeagues = allLeagues.filter((league) => {
      console.log(league);
      if (
        ((checkedNovice && league.SkillLevel === "Novice") ||
          (checkedIntermediate && league.SkillLevel === "Intermediate") ||
          (event.target.checked && league.SkillLevel === "Advanced")) &&
        ((checkedMale && league.Division === "Male") ||
          (checkedFemale && league.Division === "Female") ||
          (checkedMixed && league.Division === "Mixed"))
      ) {
        return true;
      }
      return false;
    });
    console.log(filteredLeagues);
    setLeagues(filteredLeagues);
  };

  const handleChangeMale = (event) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    setCheckedMale(event.target.checked);
    const filteredLeagues = allLeagues.filter((league) => {
      console.log(league);
      if (
        ((checkedNovice && league.SkillLevel === "Novice") ||
          (checkedIntermediate && league.SkillLevel === "Intermediate") ||
          (checkedAdvanced && league.SkillLevel === "Advanced")) &&
        ((event.target.checked && league.Division === "Male") ||
          (checkedFemale && league.Division === "Female") ||
          (checkedMixed && league.Division === "Mixed"))
      ) {
        return true;
      }
      return false;
    });
    console.log(filteredLeagues);
    setLeagues(filteredLeagues);
  };

  const handleChangeFemale = (event) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    setCheckedFemale(event.target.checked);
    const filteredLeagues = allLeagues.filter((league) => {
      console.log(league);
      if (
        ((checkedNovice && league.SkillLevel === "Novice") ||
          (checkedIntermediate && league.SkillLevel === "Intermediate") ||
          (checkedAdvanced && league.SkillLevel === "Advanced")) &&
        ((checkedMale && league.Division === "Male") ||
          (event.target.checked && league.Division === "Female") ||
          (checkedMixed && league.Division === "Mixed"))
      ) {
        return true;
      }
      return false;
    });
    console.log(filteredLeagues);
    setLeagues(filteredLeagues);
  };

  const handleChangeMixed = (event) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    setCheckedMixed(event.target.checked);
    const filteredLeagues = allLeagues.filter((league) => {
      console.log(league);
      if (
        ((checkedNovice && league.SkillLevel === "Novice") ||
          (checkedIntermediate && league.SkillLevel === "Intermediate") ||
          (checkedAdvanced && league.SkillLevel === "Advanced")) &&
        ((checkedMale && league.Division === "Male") ||
          (checkedFemale && league.Division === "Female") ||
          (event.target.checked && league.Division === "Mixed"))
      ) {
        return true;
      }
      return false;
    });
    console.log(filteredLeagues);
    setLeagues(filteredLeagues);
  };


  const fetchCurrentLocationAndLeagues = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Placeholder for converting lat/long to zip and fetching leagues
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          // You might use a third-party API to convert coords to ZIP code here
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "2em",
        overflowY: "auto",
        alignItems: "center",
      }}
    >
      <CreateLeague
        show={renderCreateLeague}
        onClose={() => setRenderCreateLeague(false)}
      />

      <Typography
        className="titleText"
        sx={{
          fontSize: "calc(1em + 1.5vw)",
          fontWeight: "bold",
          marginBottom: "1em",
        }}
      >
        LEAGUES
      </Typography>
      <Box
        sx={{
          height: "100vh",
          width: "95%",
          display: "flex",
          flexDirection: "row",
          overflowY: "auto",
          marginRight: "1em",
        }}
      >
        <Box
          sx={{
            width: "30%",
            marginBottom: "2em",
            alignItems: "center",
            flexDirection: "column",
            paddingRight: "2em",
          }}
        >
          <Typography
            className="titleText"
            sx={{
              marginLeft: "0.5em",
              fontSize: "calc(1em + 1vw)",
              fontWeight: "bold",
              marginBottom: "1em",
            }}
          >
            Filter
          </Typography>
          <Divider
            orientation="horizontal"
            variant="fullWidth"
            flexItem
            sx={{ border: "0.08em solid #9146D8" }}
          />
          <FormGroup>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "calc(1em + 0.25vw)",
                fontWeight: "bold",
                fontcolor: "black",
                marginTop: "1em",
              }}
            >
              Skill Level
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedNovice}
                  onChange={handleChangeNovice}
                  name="Novice"
                />
              }
              label="Novice"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedIntermediate}
                  onChange={handleChangeIntermediate}
                  name="Intermediate"
                />
              }
              label="Intermediate"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedAdvanced}
                  onChange={handleChangeAdvanced}
                  name="Advanced"
                />
              }
              label="Advanced"
              name="Advanced"
            />
          </FormGroup>
          <Divider
            orientation="horizontal"
            variant="fullWidth"
            flexItem
            sx={{ border: "0.08em solid #9146D8" }}
          />
          <FormGroup>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "calc(1em + 0.25vw)",
                fontWeight: "bold",
                fontcolor: "black",
                marginTop: "1em",
              }}
            >
              Division
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedMale}
                  onChange={handleChangeMale}
                  name="Male"
                />
              }
              label="Male"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedFemale}
                  onChange={handleChangeFemale}
                  name="Female"
                />
              }
              label="Female"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedMixed}
                  onChange={handleChangeMixed}
                  name="Mixed"
                />
              }
              label="Mixed"
            />
          </FormGroup>
        </Box>
        <Box
          sx={{
            width: "100%",
            marginBottom: "2em",
            alignItems: "center",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StyledInput
              value={searchLeagueName}
              onChange={(e) => {
                setSearchLeagueName(e.target.value);
                getLeagues(e.target.value);
              }}
              placeholder="Search League Name"
              sx={{
                width: "100%",
                paddingLeft: "1em",
                paddingRight: "1em",
              }}
            />
            <Tooltip title="Search a private league" arrow placement="top">
              <IconButton onClick={() => setSearchPrivate(true)}>
                <KeyIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={fetchCurrentLocationAndLeagues}
              aria-label="current location"
            >
              <MyLocationIcon />
            </IconButton>
          </Box>

          {/* Modal for searching a private league */}
          <Dialog
            open={searchPrivate}
            onClose={() => setSearchPrivate(false)}
            fullWidth
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginX: 3,
                marginTop: 2,
                marginBottom: 3,
              }}
            >
              <Typography variant="h5" align="center">
                Search a Private League
              </Typography>
              <TextField
                required
                variant="outlined"
                label="Private League Name"
                sx={{ marginY: 2 }}
              />
              <TextField
                required
                variant="outlined"
                label="Access Code"
                sx={{ marginBottom: 2 }}
              />
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: 0,
                }}
              >
                <ThemeProvider theme={buttonTheme}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "50%" }}
                    onClick={() => setSearchPrivate(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "50%" }}
                  >
                    View Teams
                  </Button>
                </ThemeProvider>
              </DialogActions>
            </Box>
          </Dialog>
          
          {user?.Username === "ADMIN_PUNCHSHOT" && (
            <ThemeProvider theme={buttonTheme}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setRenderCreateLeague(true)}
                sx={{
                  borderRadius: "calc(1em + 1vw)",
                  marginTop: "1em",
                  width: "100%",
                }}
              >
                Create League
              </Button>
            </ThemeProvider>
          )}

          <Box
            sx={{
              maxHeight: "70%",
              paddingRight: "1em",
              overflowY: "scroll",
            }}
          >
            {leagues !== null &&
              leagues.map((league, index) => (                 
                <LeagueComp
                  key={league._id} // Assuming each league has a unique ID
                  logo={require("../../assets/images/ATL1.png")} // Make sure this path is correct
                  user={user}
                  name={league.LeagueName}
                  teamsSignedUp={league.Teams}
                  startDate={league.StartDate}
                  endDate={league.EndDate}
                  registrationDate={league.TeamRegistrationDate}
                  skillLevel={league.SkillLevel}
                  division={league.Division}
                  latitude={league.Latitude}
                  longitude={league.Longitude}
                  radius={league.Radius}
                  id={league._id}
                  private={league.Private}
                  accessCode={league.AccessCode}
                  showLeague={league.Status === "PENDING" && (user?.Username === "ADMIN_PUNCHSHOT" || !league.Private)}
                  onClick={() =>
                    navigate("/leagueInfo", { state: leagues[index] })
                  }
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
