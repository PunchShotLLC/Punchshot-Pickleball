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
import LeagueGrid from "./leagueGrid.js";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/InputBase";
import { FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LeagueButton } from "./leagueButton";
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

const StyledLabel = styled("label")({
  paddingLeft: "1vw",
  marginBottom: "0.5vh",
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
  const [leagueName, setLeagueName] = useState(null);
  const [numTeams, setNumTeams] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [city, setCity] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [leagues, setLeagues] = useState(null);
  const { loading, user } = useContext(UserContext);
  const [renderCreateLeauge, setrenderCreateLeauge] = useState(false);
  const openModal = () => setrenderCreateLeauge(true);
  const closeModal = () => setrenderCreateLeauge(false);
  const navigate = useNavigate();

  // These two states activate when a user selects a league
  const [teamSelection, setTeamSelection] = useState(false);
  const [teamSelectLeagueIndex, setTeamSelectLeagueIndex] = useState(null);

  useEffect(() => {
    const isSignedIn = async () => {
      if (!loading && !user) {
        window.location.href = "/";
        alert("Sign in to access leagues page!");
      }
    };
    isSignedIn();
  }, [user, loading]);

  // When a league is selected, activate the team selection page
  const switchToTeamSelectionMode = (teamIndex) => {
    console.log(teamIndex);
    setTeamSelection(true);
    setTeamSelectLeagueIndex(teamIndex);
  };

  const navigateToLeagueInfo = (teamIndex) => {
    // Navigate to the new page with the data in the route's state
    navigate("/leagueInfo", { state: leagues[teamIndex] });
  };

  // Dates are inputted as mm-dd-yyyy
  // MongoDB requires ISO string whtvr format
  function convertDateToMongoFormat(dateString) {
    const parts = dateString.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1; // Months are zero-based (0-11)
      const day = parseInt(parts[2]);

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        const date = new Date(Date.UTC(year, month, day));
        if (!isNaN(date)) {
          return date.toISOString(); // Convert to ISO 8601 format
        }
      }
    }

    return null; // Invalid date format
  }

  /*
  Function to create a league with the values currently in the input boxes
  */
  const createLeague = async () => {
    // Put the parameters in the request body
    const body = {
      LeagueName: leagueName,
      NumTeams: numTeams,
      ZipCodes: zipCode
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e),
      City: city,
      LeagueOwner: "tempOwner",
      LeagueOwnerEmail: "tiberius.colina@gmail.com", // change in production,
      StartDate: startDate,
      Status: "PENDING",
    };

    console.log(body);

    // Create POST request
    // Catch error if exists
    const rawResponse = await fetch(
      "http://localhost:8000/leagues/createLeague",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).catch((err) => alert(err));

    const content = await rawResponse.json();

    console.log(content);
    if (!content.error) {
      alert(content.message);
    } else {
      alert(content.error);
    }
  };

  // Make a get request to retrieve all the leagues
  // Set the state so that it includes the leagues and dynamically renders
  const getLeagues = async (zip) => {
    if (!zip) {
      zip = user?.ZipCode;
    }
    console.log(zip);
    const rawResponse = await fetch(
      `http://localhost:8000/leagues/${zip}`
    ).catch((err) => console.log(err));
    const content = await rawResponse.json();

    console.log(content);
    setLeagues(content);
  };

  // Make a get request to get the leagues on the component loading
  useEffect(() => {
    getLeagues(user?.ZipCode);
  }, [user?.ZipCode]);

  console.log(leagues);



  // If the team selection state is true, render the team create/join component
  if (teamSelection) {
    return <TeamSelect league={leagues[teamSelectLeagueIndex]} />;
  } else {
    return (
      <Box sx={{ width: "70vw", height: "77.69vh", display: "flex" }}>
        <CreateLeague show={renderCreateLeauge} onClose={closeModal}></CreateLeague>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
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
            LEAGUES
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
            {/* <LeagueGrid/> */}
            <StyledInput
              onChange={(event) => getLeagues(event.target.value)}
              id="zipcode"
              placeholder="Search zipcodes"
            />

           

            {leagues !== null
              ? leagues.map((item, index) => (
                  <LeagueComp
                    logo={require("../../assets/images/ATL1.png")}
                    name={leagues[index]["LeagueName"]}
                    numberOfTeams={leagues[index]["NumTeams"]}
                    teamsSignedUp={leagues[index]["Teams"].length}
                    startDate={leagues[index]["StartDate"]}
                    city={leagues[index]["City"]}
                    id={leagues[index]["_id"]}
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
        {/* <!-- if the user is test, allow them to view a button that opens a model
        to create a league --> */}
        
        {user?.Username === "test" ? (
          <Box
            sx={{
              width: "45vw",
              height: "77.69vh",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              className="titleText"
              sx={{
                display: "flex",
                fontSize: "calc(0.7em + 1vw)",
                fontWeight: "bold",
                pt: "1%",
              }}
            >
              ADMIN COMMANDS
            </Typography>
            <Box
              sx={{
                height: "70vh",
                width: "35vw",
                borderLeft: "2px solid rgba(145, 70, 216, 1)",
              }}
            >
              <ThemeProvider theme={buttonTheme}>

                <StyledLabel htmlFor="leagueName">
                  Create a league: 
                </StyledLabel>
                <Button
                  onClick={openModal} 
                  variant="contained"
                  color="primary"
                  sx={{
                    position: "relative",
                    borderRadius: "calc(0.1em + 1vw)",
                    pl: "calc(1.5vw)",
                    pr: "calc(1.8vw)",
                  }}
                >
                  Create League
                </Button>
              </ThemeProvider>
            </Box>
          </Box>
        ) : null}
      </Box>
    );
  }
};
