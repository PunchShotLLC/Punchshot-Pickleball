import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../League/league.css";
import "@fontsource/inter";
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import { LeagueComp } from "../../components/LeagueComp/LeagueCompSimplified.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../components/UserContext/usercontext";

export const AccountLeague = () => {
  const { loading, user } = useContext(UserContext);
  const [userLeagues, setUserLeagues] = useState([]);
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const isSignedIn = async () => {
      if (!loading && !user) {
        window.location.href = "/";
        alert("Sign in to access leagues page!");
      }
    };
    isSignedIn();
  }, [user, loading]);

  const setDBLeagues = async () => {
    console.log("In this!");
    const rawResponse = await fetch(
      `http://localhost:8000/leagues/${user.ZipCode}`
    ).catch((err) => console.log(err));
    const content = await rawResponse.json();

    console.log(content);
    setLeagues(content);
  };

  useEffect(() => {
    setDBLeagues();
    let accountLeagues = [];
    for (let index = 0; index < leagues.length; index++) {
      for (let i = 0; i < leagues[index].Teams.length; i++) {
        const team = leagues[index].Teams[i];
        console.log(team);
        if (
          team.TeamCaptain === user.Username ||
          team.TeamMembers.includes(user.Username)
        ) {
          accountLeagues.push({
            LeagueName: leagues[index].LeagueName,
            TeamName: team.TeamName,
            Index: index,
          });
        }
      }
    }
    console.log(accountLeagues);
    setUserLeagues(accountLeagues);
  }, [user, leagues]);

  const navigate = useNavigate();

  const navigateToLeagueInfo = (teamIndex) => {
    // Navigate to the new page with the data in the route's state
    navigate("/leagueInfo", { state: leagues[teamIndex] });
  };

  return (
    <Box
      sx={{
        width: "80vw",
        height: "77.69vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        className="titleText"
        sx={{
          display: "flex",
          fontSize: "calc(0.7em + 1vw)",
          fontWeight: "bold",
          pt: "1%",
          marginBottom: "2%",
        }}
      >
        YOUR LEAGUES
      </Typography>
      <Typography
        className="bodyText"
        sx={{
          display: "absolute",
          fontSize: "calc(0.5em + 1vw)",
          fontWeight: "bold",
        }}
      ></Typography>
      <Box sx={{ position: "relative", height: "100%", width: "90%" }}>
        {userLeagues != null
          ? userLeagues.map((item, index) => (
              <LeagueComp // replace to simplied
                logo={require("../../assets/images/ATL1.png")}
                name={userLeagues[index]["LeagueName"]}
                teamName={userLeagues[index]["TeamName"]}
                onClick={() => {
                  navigateToLeagueInfo(userLeagues[index]["Index"]);
                }}
              />
            ))
          : null}
        <Box
          sx={{
            position: "absolute",
            top: "102%",
            left: "9.5%",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        ></Box>
      </Box>
    </Box>
  );
};
