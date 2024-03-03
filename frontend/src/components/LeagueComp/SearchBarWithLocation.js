import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/UserContext/usercontext';
import { LeagueComp } from '../../components/LeagueComp/LeagueCompSimplified.js';
import axios from 'axios';

export const AccountLeague = () => {
  const { loading, user } = useContext(UserContext);
  const [userLeagues, setUserLeagues] = useState([]);
  const [searchZip, setSearchZip] = useState('');
  const navigate = useNavigate();

  // Fetch leagues based on the user or searched ZIP code
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/";
      alert("Sign in to access leagues page!");
    } else {
      fetchLeagues(searchZip || user.ZipCode);
    }
  }, [user, loading, searchZip]);

  const fetchLeagues = async (zip) => {
    try {
      const response = await axios.get(`http://localhost:8000/leagues/${zip}`);
      const leagues = response.data;
      // Assuming leagues have a Teams array to filter on
      const accountLeagues = leagues.reduce((acc, league) => {
        league.Teams.forEach(team => {
          if (team.TeamCaptain === user.Username || team.TeamMembers.includes(user.Username)) {
            acc.push({
              LeagueName: league.LeagueName,
              TeamName: team.TeamName,
              LeagueId: league._id // Assuming there's an ID field
            });
          }
        });
        return acc;
      }, []);
      setUserLeagues(accountLeagues);
    } catch (error) {
      console.error("Failed to fetch leagues", error);
      // Handle errors appropriately in your UI
    }
  };

  const fetchCurrentLocationAndLeagues = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Here, you'd ideally convert latitude and longitude to a ZIP code using a geocoding API
        // Then, fetch leagues with that ZIP code
        // For demonstration, let's just log the coordinates
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // Placeholder for fetching leagues with the converted ZIP
        // fetchLeagues(convertedZip);
      }, () => {
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <Box sx={{ width: "80vw", height: "77.69vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography className="titleText" sx={{ display: "flex", fontSize: "calc(0.7em + 1vw)", fontWeight: "bold", pt: "1%", marginBottom: "2%" }}>
        YOUR LEAGUES
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by ZIP code"
          inputProps={{ 'aria-label': 'search by ZIP code' }}
          value={searchZip}
          onChange={(e) => setSearchZip(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={fetchCurrentLocationAndLeagues}>
          <MyLocationIcon />
        </IconButton>
      </Box>

      {userLeagues.length > 0 ? userLeagues.map((league, index) => (
        <LeagueComp
          key={index}
          logo={require("../../assets/images/ATL1.png")} // Ensure this path is correct and accessible
          name={league.LeagueName}
          teamName={league.TeamName}
          onClick={() => navigate(`/leagueInfo/${league.LeagueId}`)}
        />
      )) : <Typography>No leagues found</Typography>}
    </Box>
  );
};