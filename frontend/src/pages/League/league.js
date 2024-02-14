import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../../components/UserContext/usercontext';
import { LeagueComp } from '../../components/LeagueComp/LeagueComp.js';
import { CreateLeague } from '../../components/LeagueComp/CreateLeague.js';
import axios from 'axios';

// Assuming your styled component and theme are correctly defined as before
const StyledInput = styled(InputBase)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "30vw",
  paddingLeft: "1vw",
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
  const { loading, user } = useContext(UserContext);
  const [renderCreateLeague, setRenderCreateLeague] = useState(false);
  const [searchZip, setSearchZip] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
      alert("Sign in to access leagues page!");
    } else {
      getLeagues(user?.ZipCode);
    }
  }, [user, loading, navigate]);

  const getLeagues = async (zip) => {
    try {
      const response = await axios.get(`http://localhost:8000/leagues/${zip || user?.ZipCode}`);
      setLeagues(response.data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      alert('Failed to fetch leagues');
    }
  };

  const fetchCurrentLocationAndLeagues = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Placeholder for converting lat/long to zip and fetching leagues
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // You might use a third-party API to convert coords to ZIP code here
      }, () => {
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", padding: "2em", overflowY: "auto" }}>
      <CreateLeague show={renderCreateLeague} onClose={() => setRenderCreateLeague(false)} />

      <Typography className="titleText" sx={{ fontSize: "calc(1em + 1.5vw)", fontWeight: "bold", marginBottom: "1em" }}>
        LEAGUES
      </Typography>

      <Box sx={{ width: "70%", marginBottom: "2em", alignItems: "center" }}>
        <StyledInput
          value={searchZip}
          onChange={(e) => {
            setSearchZip(e.target.value);
            getLeagues(e.target.value);
          }}
          placeholder="Search zipcodes"
          sx={{ marginBottom: "1em", width: "100%", paddingLeft: "1em", paddingRight: "1em" }}
        />
        <IconButton onClick={fetchCurrentLocationAndLeagues} aria-label="current location">
          <MyLocationIcon />
        </IconButton>

        {user?.Username === "ADMIN_PUNCHSHOT" && (
          <ThemeProvider theme={buttonTheme}>
            <Button variant="contained" color="primary" onClick={() => setRenderCreateLeague(true)} sx={{ borderRadius: "calc(1.5em + 1vw)", marginTop: "1em", width: "100%" }}>
              Create League
            </Button>
          </ThemeProvider>
        )}

        {leagues !== null ? leagues.map((league, index) => (
          <LeagueComp
            key={league._id} // Assuming each league has a unique ID
            logo={require("../../assets/images/ATL1.png")} // Make sure this path is correct
            name={league.LeagueName}
            numberOfTeams={league.NumTeams}
            teamsSignedUp={league.Teams.length}
            startDate={league.StartDate}
            city={league.City}
            id={league._id}
            showLeague={league.Status === "PENDING"}
            onClick={() => navigate(`/leagueInfo/${league._id}`)}
          />
        )) : "No leagues found"}
      </Box>
    </Box>
  );
};
