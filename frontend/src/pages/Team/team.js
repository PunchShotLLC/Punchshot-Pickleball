import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/UserContext/usercontext";
import Typography from "@mui/material/Typography";
import "../League/league.scss";
import "@fontsource/inter";
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/InputBase";
import { FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import axios from "axios";
import { TeamSelectButton } from "./teamSelectButton";

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

export const TeamSelect = (props) => {
  // Grab the cookies
  const { loading, user } = useContext(UserContext);
  // location.state holds the info about the league
  const location = useLocation();
  console.log(user);
  console.log(location);
  // For the input for a new team
  const [teamState, setTeamState] = useState(location.state);
  const [teamName, setTeamName] = useState(null);
  const [homeCourtAddress, setHomeCourtAddress] = useState(null);
  const [homeCourtMessage, setHomeCourtMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Adds the team to the league
  const addTeamToLeague = async () => {
    // Make a copy of the league, add the new team
    const leagueInfo = teamState;

    // alerts if team name is blank
    if (!teamName || teamName.trim() === "") {
      alert("Please enter a team name.");
      return;
    }

    // alerts if home court address is blank
    if (!homeCourtAddress || homeCourtAddress.trim() === "") {
      alert("Please enter a home court address.");
      return;
    }

    // check if the team name or home court address is already taken
    const isTeamNameTaken = leagueInfo.Teams.some(
      (team) => team.TeamName === teamName
    );

    // alerts if team is taken
    if (isTeamNameTaken) {
      alert("This team name is already taken. Please choose a different one.");
      return;
    }

    // console.log(leagueInfo);
    console.log(user);
    if (!loading && !user) {
      console.log("not signed in");
    }

    let isCaptain = leagueInfo["Teams"].find(
      (obj) => obj.TeamCaptain === user.Username
    );
    console.log("Creating Team");
    console.log("userName" + user.Username);
    console.log("is captain " + JSON.stringify(isCaptain));

    if (isCaptain) {
      alert("Cannot make new team as captain of another team");
      return;
    }
    leagueInfo["Teams"].push({
      TeamName: teamName,
      TeamCaptain: user.Username,
      CaptainEmail: user.Email,
      TeamMembers: [],
      PotentialTeamMembers: [],
      HomeCourtAddress: homeCourtAddress,
    });
    console.log(leagueInfo);

    // Make a patch request to the leagues API with the updated league object
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leagueInfo),
    };

    // Make the PATCH request to update the leagues
    const apiUrl = `http://localhost:8000/leagues/updateLeague/${location.state["_id"]}`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTeamState(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const removePlayerFromTeam = async (teamIndex) => {
    if (!user) {
      console.log("not signed in");
      return;
    }

    let PlayerList = teamState.Teams[teamIndex].TeamMembers;
    console.log(PlayerList);

    let teamCaptain = teamState.Teams[teamIndex].TeamCaptain;
    var leagueInfo = teamState;
    if (teamCaptain === user.Username) {
      if (PlayerList.length === 0) {
        leagueInfo.Teams.splice(teamIndex, 1);
        alert("Dropping team");
      } else {
        leagueInfo.Teams[teamIndex].TeamCaptain = PlayerList[0];
        leagueInfo.Teams[teamIndex].TeamMembers.splice(0, 1);
        alert("Assigning new captain");
      }
    } else {
      //find user in memberlist and remove from memberlist
      console.log("in filter");
      let userIndex = PlayerList.indexof(user.Username);
      if (userIndex === -1) {
        alert("User already not in team");
        return;
      }
      leagueInfo.Teams[teamIndex].TeamMembers.splice(userIndex, 1);
      alert("Leaving team");
    }

    const apiUrl = `http://localhost:8000/leagues/updateLeague/${location.state["_id"]}`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leagueInfo),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTeamState(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    location.state = leagueInfo;
  };

  // Adds a player to the potential team member list of a team
  const addPlayerToPotentialList = async (teamIndex) => {
    if (!user) {
      console.log("not signed in");
      return;
    }

    let potentialPlayerList = teamState.Teams[teamIndex].PotentialTeamMembers;
    console.log(potentialPlayerList);

    let isCaptain = teamState["Teams"].find(
      (obj) => obj.TeamCaptain === user.Username
    );

    if (isCaptain) {
      alert("Cannot request to join new team as captain of this/another team");
      return;
    }

    let inTeam = potentialPlayerList.find((obj) => obj === user.Username);

    if (inTeam) {
      alert("Already in potential player list");
      return;
    }

    let inPotentialList = teamState.Teams.some((team) =>
      team.PotentialTeamMembers.find((obj) => obj === user.Username)
    );
    if (inPotentialList) {
      alert("Already in a potential player list");
      return;
    }

    potentialPlayerList.push(user.Username);

    // Make the PATCH request to update the leagues
    const apiUrl = `http://localhost:8000/leagues/updateLeague/${location.state["_id"]}`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamState),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTeamState(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Make the GET request to send an email
    const emailApiUrl = `http://localhost:8000/leagues/sendRequestEmail?sendTo=${location.state.Teams[teamIndex].CaptainEmail}&user=${user.Username}`;

    fetch(emailApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // fetches address suggestions with dropdown
  const fetchAddressSuggestions = (input) => {
    if (input.length > 2) {
      const requestOptions = {
        method: "GET",
      };
      const suggestionsApiUrl = `http://localhost:8000/leagues/address?input=${input}`;
      fetch(suggestionsApiUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("we got result");
          console.log(result);
          setSuggestions(result.features);
        })
        .catch((error) => console.log("error", error));
    } else {
      setSuggestions([]);
    }
  };

  // event handler for homeCourtAddress input changes
  const handleHomeCourtAddressChange = (event) => {
    const input = event.target.value;
    fetchAddressSuggestions(input);
    setHomeCourtAddress(input);
  };

  // function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setHomeCourtAddress(suggestion.properties.formatted);
    setSuggestions([]);
  };

  // checking if multiple home court addresses
  const checkHomeCourtAddress = () => {
    const leagueInfo = location.state;
    const homeCourtAddressCount = leagueInfo.Teams.filter(
      (team) => team.HomeCourtAddress === homeCourtAddress
    ).length;
    if (homeCourtAddressCount > 0) {
      const teamWord1 = homeCourtAddressCount === 1 ? "is" : "are";
      const teamWord2 = homeCourtAddressCount === 1 ? "" : "s";
      const teamWord3 = homeCourtAddressCount === 1 ? "has" : "have";
      setHomeCourtMessage(
        `FYI: There ${teamWord1} ${homeCourtAddressCount} other team${teamWord2} that ${teamWord3} this home court address`
      );
    } else {
      setHomeCourtMessage("");
    }
  };

  // call checkHomeCourtAddress when the homeCourtAddress state changes
  useEffect(() => {
    checkHomeCourtAddress();
  }, [homeCourtAddress]);

  // formatting for suggestions
  const SuggestionsList = styled("ul")({
    listStyleType: "none",
    margin: 0,
    padding: 0,
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fff",
    width: "30vw",
    borderRadius: "0 0 1em 1em",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    top: "calc(100% + 25px)",
    left: 0,
  });

  // define a styled component for the suggestions list items
  const SuggestionItem = styled("li")({
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "0.8em",

    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  });

  console.log(location.state);

  return (
    <Box sx={{ width: "80vw", height: "77.69vh", display: "flex" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
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
            align: "center",
            marginLeft: "10vw",
          }}
        >
          {teamState.LeagueName}
        </Typography>
        <Typography
          className="bodyText"
          sx={{
            display: "absolute",
            fontSize: "calc(0.1em + 1vw)",
            align: "left",
            marginLeft: "10vw",
          }}
        >
          Teams Required: {teamState.NumTeams}
        </Typography>
        <Typography
          className="bodyText"
          sx={{
            display: "absolute",
            fontSize: "calc(0.1em + 1vw)",
            align: "left",
            marginLeft: "10vw",
          }}
        >
          Start Date: {new Date(teamState.StartDate).toLocaleDateString()}
        </Typography>
        <Typography
          className="bodyText"
          sx={{
            display: "absolute",
            fontSize: "calc(0.1em + 1vw)",
            align: "left",
            marginLeft: "10vw",
            marginBottom: "8em",
          }}
        >
          <FormControl
            sx={{ height: "7vw", marginLeft: "1.5vw", position: "relative" }}
          >
            <StyledLabel htmlFor="leagueName">
              Team Name<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              onChange={(event) => setTeamName(event.target.value)}
              id="leagueName"
              placeholder="Team1"
              required
            />
            <StyledLabel htmlFor="homeCourtAddress">
              Home Court Address<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
              value={homeCourtAddress}
              onChange={handleHomeCourtAddressChange}
              id="homeCourtAddress"
              placeholder="123 Main St"
              required
            />
            {suggestions.length > 0 && (
              <SuggestionsList>
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.properties.formatted}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            )}
            {/* Disclaimer text */}
            <Typography
              sx={{
                display: "block",
                fontSize: "calc(0.5em + 0.5vw)",
                color: "gray",
                marginTop: "0.25em",
                marginBottom: "0.5em",
              }}
            >
              * Ensuring court availability is your team’s responsibility.
            </Typography>
            <Typography
              sx={{
                height: "20px",
                fontSize: "calc(0.5em + 0.5vw)",
                color: "primary",
                marginTop: "0.5em",
                marginBottom: "0.5em",
                visibility: homeCourtMessage ? "visible" : "hidden",
              }}
            >
              {homeCourtMessage}
            </Typography>
            <Button
              onClick={addTeamToLeague}
              variant="contained"
              color="primary"
              sx={{
                position: "relative",
                borderRadius: "calc(0.1em + 0.5vw)",
                pl: "calc(1.5vw)",
                pr: "calc(1.8vw)",
                marginTop: "1em",
              }}
            >
              Create Team
            </Button>
          </FormControl>
        </Typography>

        <Box sx={{ position: "relative", left: "3svw", overflow: 'scroll' }}>
          {/* Dynamically renders the teams within the league */}
          {teamState.Teams !== null
            ? teamState.Teams.map((item, index) => (
                <TeamSelectButton
                  onClick={() => {
                    addPlayerToPotentialList(index);
                  }}
                  onClickRemoveUser={() => {
                    console.log("Remove User Is Running");
                    removePlayerFromTeam(index);
                  }}
                  name={teamState.Teams[index].TeamName}
                  captain={teamState.Teams[index].TeamCaptain}
                  members={teamState.Teams[index].TeamMembers}
                  home={teamState.Teams[index].HomeCourtAddress}
                  potentialMembers={teamState.Teams[index].PotentialTeamMembers}
                  showPotentialMembers={
                    user && user.Username === teamState.Teams[index].TeamCaptain
                  }
                  leagueInfo={teamState}
                  teamIndex={index}
                  updateTeam={setTeamState}
                />
              ))
            : null}

          <Box sx={{ width: "45vw", height: "4vh", display: "flex" }}></Box>
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
