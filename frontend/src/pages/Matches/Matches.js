import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MatchesTable from "./MatchesTable";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import { Dialog, DialogActions, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../../components/UserContext/usercontext";

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

export const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [searchLeagueName, setSearchLeagueName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentLeague, setCurrentLeague] = useState(null); // Renamed from 'league' to avoid confusion in useEffect dependencies
  const [searchPrivate, setSearchPrivate] = React.useState(false);
  const { user } = useContext(UserContext);

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
      const filtered = leagues.filter((league) => {
        return league.LeagueName.toLowerCase().includes(searchLeagueName.toLowerCase())
        && league.Status === "ONGOING" && (user?.Username === "ADMIN_PUNCHSHOT" || !league.Private);
      }
      );
      setSuggestions(filtered);
    }
  }, [searchLeagueName, leagues, user?.Username]);

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
          paddingTop="3em"
          paddingBottom="3em"
        >
          <Box display="flex" alignItems="center">
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
                  marginTop: "100px", // Adjusted for clear separation
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
            <Button
              variant="contained"
              onClick={() => setSearchPrivate(true)}
              style={{
                height: "30px",
                marginLeft: "10px",
                backgroundColor: "#1976D2",
              }} // Adjust the marginLeft as needed, and set the background color to blue
            >
              Search Private
            </Button>
          </Box>

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
                    Search
                  </Button>
                </ThemeProvider>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};
