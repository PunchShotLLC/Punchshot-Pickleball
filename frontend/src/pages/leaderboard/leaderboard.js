import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CustomizedInputs from "./CustomizedInputs";
// import TournamentTable from "./TournamentTable";
import { alpha } from "@mui/material/styles";
import AntTab from "./AntTab";
import LeaderboardTable from "./LeaderboardTable";

// Create your styles using makeStyles
export const Leaderboard = () => {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("");

  useEffect(() => {
    // Fetch ongoing leagues from the backend
    const fetchLeagues = async () => {
      const response = await fetch('http://localhost:8000/leagues/');
      const data = await response.json();
      setLeagues(data);
    };

    fetchLeagues();
  }, []);

  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "77.69vh",
          left: "0px",
          background: "linear-gradient(100.59deg, #A1C038 0%, #000000 100%)",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "calc(1.7em + 1vw)",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1vw",
          }}
        >
          League Leaderboard
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "1rem",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1.7em",
          }}
        >
          Select your league!
        </Typography>
        <FormControl
          sx={{
            marginLeft: "39.5vw",
            height: "7vw",
            width: "20vw",
            position: "relative",
            align: "center",
            '& .MuiInputLabel-root': {
              color: 'white', 
              fontWeight: 'bold'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', 
              },
              '&:hover fieldset': {
                borderColor: 'white', 
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', 
              },
            },
          }}
        >
          <InputLabel id="league-select-label">Select League</InputLabel>
          <Select
            labelId="league-select-label"
            id="league-select"
            value={selectedLeague}
            label="Select League"
            onChange={handleLeagueChange}
          >
            {leagues.map((league) => (
              <MenuItem key={league._id} value={league._id}>
                {league.LeagueName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="3em"
      paddingBottom="3em"
    >
      <Box
          >
            <LeaderboardTable />
      </Box>
    </Box>
  </Box>
</Box>
  );
};



