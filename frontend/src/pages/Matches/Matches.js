import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MatchesTable from "./MatchesTable";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";

function createData(
  league,
  team1,
  team2,
  team1captain,
  team2captain,
  winner,
  score
) {
  return { league, team1, team2, winner, score, team1captain, team2captain };
}

export const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [searchLeagueName, setSearchLeagueName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentLeague, setCurrentLeague] = useState(null); // Renamed from 'league' to avoid confusion in useEffect dependencies

  const getLeagues = async (search = "") => {
    try {
      const response = await axios.get(
        `http://localhost:8000/leagues/${search}`
      );
      setLeagues(response.data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
      alert("Failed to fetch leagues");
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

  useEffect(() => {
    if (searchLeagueName === "") {
      setSuggestions([]);
    } else {
      const filtered = leagues.filter((league) =>
        league.LeagueName.toLowerCase().includes(searchLeagueName.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [searchLeagueName, leagues]);

  const handleSearchChange = (event) => {
    setSearchLeagueName(event.target.value);
  };

  const handleSuggestionClick = (leagueName) => {
    setSearchLeagueName(leagueName);
    setMatchesInTable(leagueName); 
    setSuggestions([]);
  };
  

  const setMatchesInTable = (leagueName) => {
    const league = leagues.find((l) => l.LeagueName === leagueName);
    if (!league) {
      setMatches([]);
      setCurrentLeague(null);
      return;
    }
    setCurrentLeague(league);

    let matchesAfterCreateData = league.Matches.map((match) => {
      let captain1 = league.Teams.find(
        (t) => t.TeamName === match.Team1
      )?.TeamCaptain;
      let captain2 = league.Teams.find(
        (t) => t.TeamName === match.Team2
      )?.TeamCaptain;
      return createData(
        match.Date,
        match.Team1,
        match.Team2,
        captain1,
        captain2,
        match.WinnerTeam,
        match.Score
      );
    });

    setMatches(matchesAfterCreateData);
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
          MATCHES
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              width: "75%",
              color: "white",
              fontFamily: "Inter",
              fontSize: "1rem",
              fontWeight: "400",
              textAlign: "center",
              paddingTop: ".5vw",
            }}
          >
            Select a league to see the league's matches. If you are a team
            captain, click on a match to edit or submit a score.
          </Typography>
        </Box>

        <Box
  display="flex"
  flexDirection="column"
  justifyContent="center"
  alignItems="center"
  alignContent="center"
  paddingTop="3em"
  paddingBottom="3em"
  paddingLeft="25%"
  width="50%"
  position="relative"  // Ensure the position context is set correctly
>
  <input
    value={searchLeagueName}
    onChange={handleSearchChange}
    placeholder="Search League Name"
    style={{
      width: "200px",
      height: "30px",
      marginBottom: "10px",
      padding: "10px",
      fontFamily: "Arial",
    }}
  />
  {searchLeagueName.length >= 3 && suggestions.length > 0 && (
    <Box
    sx={{
      width: "200px",
      maxHeight:
        suggestions.length > 3
          ? "150px"
          : `${40 * suggestions.length}px`, // Dynamic maxHeight adjustment
      overflowY: "auto",
      position: "absolute",
      marginTop: "10px", // Adjusted for clear separation
      background: "white",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      zIndex: 5, // Ensure this is on top of other elements
    }}
  >
    {suggestions.map((suggestion) => (
      <Box
        key={suggestion._id}
        sx={{
          padding: "10px",
          cursor: "pointer",
          "&:hover": {
            background: "#f0f0f0",
          },
        }}
        onClick={() =>
          handleSuggestionClick(
            suggestion.LeagueName,
            suggestion._id
          )
        }
      >
        {suggestion.LeagueName}
      </Box>
      ))}
    </Box>
  )}

          <Box
            sx={{
              width: "80%",
              paddingLeft: "1em",
              paddingRight: "1em",
              borderRadius: 4,
              marginTop: "3em",
              backgroundColor: "#ffffff",
              border: "3px solid #D5FD51",
              overflow: "auto",
              "&:hover": {
                boxShadow: `${alpha("#ffffff", 0.25)} 0 0 0 0.2rem`,
              },
            }}
          >
            {matches.length > 0 ? (
              <MatchesTable
                matches={matches}
                league={currentLeague}
                updateLeague={getLeagues}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
