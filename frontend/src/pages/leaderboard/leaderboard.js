import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LeaderboardTable from "./LeaderboardTable";
import { alpha } from "@mui/material/styles";
import { UserContext } from "../../components/UserContext/usercontext";


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
            Select a league to see the league's leaderboard.
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
          <select
            name="league-select-label"
            id="league-select"
            value={selectedLeague}
            onChange={handleLeagueChange}
            style={{
              width: "200px",
              height: "50px",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "10px",

              fontFamily: "Arial",
            }}
          >
             <option id="none">Select League</option>

            {leagues.map((league) => (
              <option key={league._id} value={league._id}>
                {league.LeagueName}
              </option>
            ))}
          </select>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
                width: "80%",
                paddingLeft: "1em",
                paddingRight: "1em",
                borderRadius: 4,
                backgroundColor: "#ffffff",
                border: "3px solid #D5FD51",
                "&:hover": {
                  boxShadow: `${alpha("#ffffff", 0.25)} 0 0 0 0.2rem`,
                },
              }}
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