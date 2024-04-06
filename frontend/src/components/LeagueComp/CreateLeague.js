import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import { Checkbox } from "@mui/material";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import MapWithCircle from "./MapWithCircle";
import axios from "axios";
import { setDefaults, fromAddress } from "react-geocode";

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

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  margin: "32px",
});

const StyledForm = styled("form")({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "calc(100% - 64px)",
  maxWidth: "600px",
});

const FormRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
});

const ModalContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

//const RADIUS_TEST = 10000;

export const CreateLeague = ({ show, onClose }) => {
  const [leagueName, setLeagueName] = useState("");
  const [leagueSkillLevel, setLeagueSkillLevel] = useState("");
  const [leagueDivision, setLeagueDivision] = useState("");
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // States for location-setting, including coordinates and radius
  const [leagueRadiusMile, setLeagueRadiusMile] = useState("0");
  const [leagueRadiusMeter, setLeagueRadiusMeter] = useState(0);
  const [leagueCenterCoords, setLeagueCenterCoords] = useState(null);
  const [address, setAddress] = useState("");
  const [privateLeague, setPrivateLeague] = useState(false);

  const [leagues, setLeagues] = useState(null);

  // TODO: ENTER API KEY
  setDefaults({
    key: "",
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
    
  });

  /**
   * Centers the map at a particular address.
   * Uses google maps geocode api to receive coordinates from an addresss
   * @param {string} address address of where to center the map
   */
  const updateMapWithAddress = (address) => {
    if (!address) address = "Atlanta";
    fromAddress(address)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        console.log(lat, lng);

        setLeagueCenterCoords({ lat: lat, lng: lng });
      })
      .catch(console.error);
  };

  const createLeague = async () => {
    console.log("I GOT HERE");

    // Ensure registration date is at least a week before the league start date
    const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week
    if (new Date(startDate) - new Date(registrationDate) < weekInMilliseconds) {
      alert(
        "Team registration date must be at least a week before the league start date."
      );
      return;
    }

    if (
      leagueName === null ||
      leagueName.length === 0 ||
      registrationDate == null ||
      registrationDate.length === 0 ||
      startDate === null ||
      startDate.length === 0 ||
      endDate === null ||
      endDate.length === 0 ||
      leagueDivision === null ||
      leagueDivision.length === 0 ||
      leagueSkillLevel === null ||
      leagueSkillLevel.length === 0
    ) {
      alert("All fields are required!");
      return;
    }

    // Put the parameters in the request body
    const body = {
      LeagueName: leagueName,
      LeagueOwner: "ADMIN_PUNCHSHOT",
      LeagueOwnerEmail: "vigneshsreedhar2002@gmail.com",
      StartDate: startDate,
      EndDate: endDate,
      TeamRegistrationDate: registrationDate,
      Division: leagueDivision,
      SkillLevel: leagueSkillLevel,
      Status: "PENDING",
      Latitude: leagueCenterCoords.lat,
      Longitude: leagueCenterCoords.lng,
      Radius: leagueRadiusMeter,
      Private: privateLeague,
      Day: day,
    };

    console.log("RESP TEST");

    const resp = await axios.post(
      "http://localhost:8000/leagues/createLeague",
      body
    );

    console.log("RESP");
    console.log(resp);
    console.log("END RESP");

    if (resp.data.error) {
      alert(resp.data.error);
    } else {
      window.location.reload(false);
    }
  };

  useEffect(() => {
    if (leagueRadiusMile) {
      setLeagueRadiusMeter(parseFloat(leagueRadiusMile) * 1609.344);
    }
    updateMapWithAddress(address);
  }, [address, leagueRadiusMile]);

  if (!show) {
    return null;
  }

  const handleChangePrivate = (event) => {
    const isChecked = event.target.checked;
    setPrivateLeague(isChecked);
  };

  return (
    <ThemeProvider theme={buttonTheme}>
      <StyledModal open={show} onClose={onClose}>
        <StyledForm>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Create New League</Typography>
          <FormRow>
            <TextField
              label="League Name"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              fullWidth
            />
            <Select
              value={leagueSkillLevel}
              onChange={(e) => setLeagueSkillLevel(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Skill Level
              </MenuItem>
              <MenuItem value="Novice">Novice</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormRow>
          <FormRow>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            />
            <TextField
              label="Registration Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={registrationDate}
              onChange={(e) => setRegistrationDate(e.target.value)}
              fullWidth
            />
          </FormRow>
          <FormRow>
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            />
            <Select
              value={leagueDivision}
              onChange={(e) => setLeagueDivision(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Division
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Mixed">Mixed</MenuItem>
            </Select>
          </FormRow>
          <FormRow>
            <TextField
              label="Address"
              type="text"
              fullWidth
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder=""
            />
            <TextField
              label="Radius(miles)"
              type="number"
              fullWidth
              value={leagueRadiusMile}
              onChange={(e) => {
                setLeagueRadiusMile(e.target.value);
              }}
              inputProps={{
                step: 0.1,
                min: 0,
              }}
              placeholder="Enter Radius"
            />
          </FormRow>
          <FormRow>
            <FormControlLabel onChange={handleChangePrivate} control={<Checkbox/>} label="Private" />
            <Select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                Day
              </MenuItem>
              <MenuItem value="1">Monday</MenuItem>
              <MenuItem value="2">Tuesday</MenuItem>
              <MenuItem value="3">Wednesday</MenuItem>
              <MenuItem value="4">Thursday</MenuItem>
              <MenuItem value="5">Friday</MenuItem>
              <MenuItem value="6">Saturday</MenuItem>
              <MenuItem value="0">Sunday</MenuItem>
            </Select>
          </FormRow>
          <Box
            sx={{
              my: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MapWithCircle
              center={leagueCenterCoords}
              radius={leagueRadiusMeter}
              width="600px"
              height="300px"
            />
          </Box>
          <Button variant="contained" color="primary" onClick={createLeague}>
            Create League
          </Button>
        </StyledForm>
      </StyledModal>
    </ThemeProvider>
  );
};
