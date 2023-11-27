import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LeaderboardTable from "./LeaderboardTable";

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
            fontSize: "calc(1.7em + 2vw)",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1vw",
          }}
        >
          LEAGUE LEADERBOARD
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1.7em",
            paddingBottom: "0.5em"
          }}
        >
          Choose your league!
        </Typography>
        <FormControl
          sx={{
            marginLeft: "37vw",
            height: "5vw",
            width: "25vw",
            position: "relative",
            align: "center",
            '& .MuiInputLabel-root': {
              color: 'white', 
              fontWeight: 'bold'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '2px solid #D5FD51',
                borderRadius: '20px',
              },
              '&:hover fieldset': {
                borderColor: '#D5FD51', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D5FD51', 
              },
            },
          }}
        >
          <InputLabel 
            id="league-select-label"
            sx={{
              color: 'white', 
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
            >
              Select League
            </InputLabel>
          <Select
            labelId="league-select-label"
            id="league-select"
            value={selectedLeague}
            label="Select League"
            onChange={handleLeagueChange}
            sx={{
              '.MuiSelect-select': {
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: 'white', 
                // textAlign: 'center'
              }
            }}
            MenuProps={{
              sx: {
                '& .MuiMenuItem-root': {
                  fontSize: '1.5rem',
                  padding: '10px 20px', 
                }
              }
            }}
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
    >
      <Box
        >
          {selectedLeague && (
          <Box>
            <LeaderboardTable selectedLeague={selectedLeague} />
          </Box>
        )}
      </Box>
    </Box>
  </Box>
</Box>
  );
};



