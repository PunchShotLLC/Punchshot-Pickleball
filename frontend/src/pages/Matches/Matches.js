import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MatchesTable from "./MatchesTable";
import { alpha } from "@mui/material/styles";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
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

const StyledInput = styled(InputBase)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  paddingLeft: "1vw",
  paddingRight: "48px", // Make room for the icon button on the right
  width: "100%", // Ensure the input stretches to fill the flex container
});

export const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [searchLeagueName, setSearchLeagueName] = useState("");

  // This state is for the current league selected
  // The league needs to be passed from
  // Matches -> MatchTable -> ScoreEnterBox so that
  // we can call the updateLeague endpoint
  const [league, setLeague] = useState(null);

  const getLeagues = async (leagueName) => {
    try {
      const url = `http://localhost:8000/leagues/${
        leagueName ? leagueName : ""
      }`;
      const response = await axios.get(url);
      setLeagues(response.data);
    } catch (error) {
      console.error("Error fetching leagues:", error);
      alert("Failed to fetch leagues");
    }
  };

  const setMatchesInTable = (value) => {
    if (value === "Select" || value === null) {
      setMatches([]);
      return;
    }

    const league = value;

    for (let i = 0; i < leagues.length; i++) {
      if (leagues[i]["LeagueName"] === league) {
        let matchesToSet = leagues[i]["Matches"];
        console.log(matchesToSet);

        // Make lookup table between team and captains
        let leagueTeams = leagues[i]["Teams"];
        let captains = {};
        for (let i = 0; i < leagueTeams.length; i++) {
          captains[leagueTeams[i]["TeamName"]] = leagueTeams[i]["TeamCaptain"];
        }

        let matchesAfterCreateData = [];
        for (let j = 0; j < matchesToSet.length; j++) {
          let captain1 = captains[matchesToSet[j]["Team1"]];
          let captain2 = captains[matchesToSet[j]["Team2"]];
          matchesAfterCreateData.push(
            createData(
              matchesToSet[j]["Date"],
              matchesToSet[j]["Team1"],
              matchesToSet[j]["Team2"],
              captain1,
              captain2,
              matchesToSet[j]["WinnerTeam"],
              matchesToSet[j]["Score"]
            )
          );
        }

        setMatches(matchesAfterCreateData);
        setLeague(leagues[i]);
      }
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

  useEffect(() => {
    setMatchesInTable({ target: { value: league } });
  }, [leagues]);

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
        >
          <StyledInput
            value={searchLeagueName}
            onChange={(e) => {
              setSearchLeagueName(e.target.value);
              getLeagues(e.target.value);
              console.log(leagues);
            }}
            placeholder="Search League Name"
            sx={{
              paddingLeft: "1em",
              paddingRight: "1em",
              color: "white",
              borderColor: "white",
            }}
          />
          <Box
            sx={{
              maxHeight: "70%",
              paddingLeft: "1em",
              width: "100%",
              paddingRight: "1em",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {leagues.length !== 0
              ? leagues.map(
                  (league, index) =>
                    !league.Private && (
                      <button
                        id={league["LeagueName"]}
                        key={index}
                        onClick={() => setMatchesInTable(league["LeagueName"])}
                        style={{ textAlign: "left" }}
                      >
                        {league["LeagueName"]}
                      </button>
                    )
                )
              : null}
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
                league={league}
                updateLeague={getLeagues}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
