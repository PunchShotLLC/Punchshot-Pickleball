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
      const response = await fetch("http://localhost:8000/leagues/");
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
          LEAGUE LEADERBOARD
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              width: "44%",
              color: "white",
              fontFamily: "Inter",
              fontSize: "1rem",
              fontWeight: "400",
              textAlign: "center",
              paddingTop: ".5vw",
            }}
          >
            Select a league to see the league's leaderboards.
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingTop="3em"
          paddingBottom="3em"
        >
          <Select
            labelId="league-select-label"
            id="league-select"
            value={selectedLeague}
            label="Select League"
            onChange={handleLeagueChange}
            sx={{
              ".MuiSelect-select": {
                fontSize: "1.25rem",
                color: "white",
                // textAlign: 'center'
              },
            }}
          >
            {leagues.map((league) => (
              <MenuItem key={league._id} value={league._id}>
                {league.LeagueName}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
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
