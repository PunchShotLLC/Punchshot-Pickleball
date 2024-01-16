import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MatchesTable from "./MatchesTable";
import { alpha } from "@mui/material/styles";

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

  // This state is for the current league selected
  // The league needs to be passed from
  // Matches -> MatchTable -> ScoreEnterBox so that
  // we can call the updateLeague endpoint
  const [league, setLeague] = useState(null);

  const getLeagues = async (leagueId) => {
    // Get the leagues
    const rawResponse = await fetch(`http://localhost:8000/leagues/`).catch(
      (err) => console.log(err)
    );
    const content = await rawResponse.json();

    console.log(content);

    setLeagues(content);
  };

  const setMatchesInTable = (event) => {
    if (event.target.value === "Select") {
      setMatches([]);
      return;
    }

    const league = event.target.value;

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
          console.log("Running createData");
          console.log("Captain of team 1:");
          let captain1 = captains[matchesToSet[j]["Team1"]];
          let captain2 = captains[matchesToSet[j]["Team2"]];
          console.log(captain1);
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

        console.log("matches after create data");
        console.log(matchesAfterCreateData);

        setMatches(matchesAfterCreateData);
        setLeague(leagues[i]);
      }
    }
  };

  useEffect(() => {
    getLeagues();
  }, []);

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
          <select
            name="leagues"
            id="leagues"
            onChange={setMatchesInTable}
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

            {leagues.length !== 0
              ? leagues.map((league, index) => (
                  <option id={league["LeagueName"]}>
                    {league["LeagueName"]}
                  </option>
                ))
              : null}
          </select>

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
              <MatchesTable matches={matches} league={league} />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
