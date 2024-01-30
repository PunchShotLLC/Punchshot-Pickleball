import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import "../League/league.scss";
import "@fontsource/inter";
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/InputBase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TeamSelect } from "../Team/team";
import { LeagueComp } from "../../components/LeagueComp/LeagueComp.js";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext/usercontext";
import { CreateLeague } from "../../components/LeagueComp/CreateLeague.js";

const StyledInput = styled(TextField)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "30vw",
  paddingLeft: "1vw",
});

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

export const League = () => {
  const [leagues, setLeagues] = useState(null);
  const { loading, user } = useContext(UserContext);
  const [renderCreateLeauge, setRenderCreateLeague] = useState(false);
  const openModal = () => setRenderCreateLeague(true);
  const closeModal = () => setRenderCreateLeague(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isSignedIn = async () => {
      if (!loading && !user) {
        window.location.href = "/";
        alert("Sign in to access leagues page!");
      }
    };
    isSignedIn();
  }, [user, loading]);

  const navigateToLeagueInfo = (teamIndex) => {
    // Navigate to the new page with the data in the route's state
    navigate("/leagueInfo", { state: leagues[teamIndex] });
  };

  // Make a get request to retrieve all the leagues
  // Set the state so that it includes the leagues and dynamically renders
  const getLeagues = async (zip) => {
    if (!zip) {
      zip = user?.ZipCode;
    }
    const rawResponse = await fetch(
      `http://localhost:8000/leagues/${zip}`
    ).catch((err) => console.log(err));
    const content = await rawResponse.json();

    setLeagues(content);
  };

  // Make a get request to get the leagues on the component loading
  useEffect(() => {
    getLeagues(user?.ZipCode);
  }, [user?.ZipCode]);

  // If the team selection state is true, render the team create/join component
  // if (teamSelection) {
  //   return <TeamSelect league={leagues[teamSelectLeagueIndex]} />;
  // } else {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "2em",
        overflowY: "auto",
      }}
    >
      <CreateLeague
        show={renderCreateLeauge}
        onClose={closeModal}
      ></CreateLeague>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          className="titleText"
          sx={{
            fontSize: "calc(1em + 1.5vw)",
            fontWeight: "bold",
            marginBottom: "1em",
          }}
        >
          LEAGUES
        </Typography>

        <Box sx={{ width: "70%", marginBottom: "2em", alignItems: "center" }}>
          <StyledInput
            onChange={(event) => getLeagues(event.target.value)}
            id="zipcode"
            placeholder="Search zipcodes"
            sx={{
              marginBottom: "1em",
              width: "100%",
              paddingLeft: "1em",
              paddingRight: "1em",
            }}
          />

          {user?.Username === "ADMIN_PUNCHSHOT" && (
            <ThemeProvider theme={buttonTheme}>
              <Button
                onClick={openModal}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "calc(1.5em + 1vw)",
                  marginTop: "1em",
                  marginBottom: "3em",
                  width: "100%",
                }}
              >
                Create League
              </Button>
            </ThemeProvider>
          )}

          {leagues !== null
            ? leagues.map((item, index) => (
                <LeagueComp
                  logo={require("../../assets/images/ATL1.png")}
                  name={leagues[index]["LeagueName"]}
                  numberOfTeams={leagues[index]["NumTeams"]}
                  teamsSignedUp={leagues[index]["Teams"].length}
                  teams={leagues[index]["Teams"]}
                  startDate={leagues[index]["StartDate"]}
                  city={leagues[index]["City"]}
                  id={leagues[index]["_id"]}
                  showLeague={leagues[index]["Status"] === "PENDING"}
                  allowStart={user?.Username === "test"}
                  onClick={() => {
                    navigateToLeagueInfo(index);
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
    </Box>
  );
};
