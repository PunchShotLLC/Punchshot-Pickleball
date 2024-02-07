import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/UserContext/usercontext";
import Typography from "@mui/material/Typography";
import "../League/league.css";
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

// define a styled component for the suggestions list items
const SuggestionItem = styled("li")({
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "0.8em",

  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

export const TeamSelect = (props) => {
  // Grab the cookies
  const { loading, user } = useContext(UserContext);
  // location.state holds the info about the league
  const location = useLocation();
  // For the input for a new team
  const [teamState, setTeamState] = useState(location.state);
  const [teamName, setTeamName] = useState(null);
  const [homeCourtAddress, setHomeCourtAddress] = useState(null);
  const [homeCourtMessage, setHomeCourtMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const updateLeague = async (update) => {
    const apiUrl = `http://localhost:8000/leagues/updateLeague/${location.state["_id"]}`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTeamState(responseData);
        alert("League Updated");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // State to determine whether to show the team creation form
  const [showTeamCreationForm, setShowTeamCreationForm] = useState(false);
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
    let inPotentialList = teamState.Teams.some((team) =>
      team.PotentialTeamMembers.find((obj) => obj === user.Username)
    );
    if (inPotentialList) {
      alert("Cannot create team as potential member");
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
    updateLeague(leagueInfo);
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

    // If the captain is leaving the team,
    // If there are no more players in the team, delete the team
    // Otherwise the next person on the list becomes the captain
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
      let userIndex = PlayerList.indexOf(user.Username);
      if (userIndex === -1) {
        alert("User already not in team");
        return;
      }
      leagueInfo.Teams[teamIndex].TeamMembers.splice(userIndex, 1);
      alert("Leaving team");
    }

    updateLeague(leagueInfo);
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

    // Check if the user is the captain of this or another team
    let isCaptain = teamState["Teams"].find(
      (obj) => obj.TeamCaptain === user.Username
    );

    if (isCaptain) {
      alert("Cannot request to join new team as captain of this/another team");
      return;
    }

    // Check if the user is in the potenteial players list of this team
    let inPotentialTeam = potentialPlayerList.find(
      (obj) => obj === user.Username
    );

    if (inPotentialTeam) {
      alert("Already in potential player list");
      return;
    }

    // Check if the user is in the potenteial players list of another team
    let inPotentialList = teamState.Teams.some((team) =>
      team.PotentialTeamMembers.find((obj) => obj === user.Username)
    );
    if (inPotentialList) {
      alert("Already in a potential player list");
      return;
    }

    // Check if the user is already in the team
    let playerList = teamState.Teams[teamIndex]["TeamMembers"];
    let isInTeam = playerList.find((obj) => obj === user.Username);
    if (isInTeam) {
      alert("Already in the team");
      return;
    }

    potentialPlayerList.push(user.Username);

    // Make the PATCH request to update the leagues
    updateLeague(teamState);

    alert("A request is being sent to the captain");
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
    if (input && input.length > 2) {
      const requestOptions = {
        method: "GET",
      };
      const suggestionsApiUrl = `http://localhost:8000/leagues/address?input=${input}`;
      fetch(suggestionsApiUrl, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("we got result");
          console.log(result);
          setSuggestions(result.predictions);
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
        {showTeamCreationForm ? null : (
          <Button
            onClick={() => setShowTeamCreationForm(true)}
            variant="contained"
            color="primary"
            sx={{
              position: "relative",
              margin: "0 auto",
              borderRadius: "calc(0.1em + 0.5vw)",
              width: "20%",
              right: "0px",
              pl: "calc(1.5vw)",
              pr: "calc(1.8vw)",
              marginTop: "1em",
            }}
          >
            Create Team
          </Button>
        )}

        {showTeamCreationForm ? (
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
                      {suggestion.description}
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

              <Box>
                <Button
                  onClick={() => setShowTeamCreationForm(false)}
                  variant="contained"
                  color="grey"
                  sx={{
                    position: "relative",
                    borderRadius: "calc(0.1em + 0.5vw)",
                    width: "50%",
                    pl: "calc(1.5vw)",
                    pr: "calc(1.8vw)",
                    marginTop: "1em",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={addTeamToLeague}
                  variant="contained"
                  color="primary"
                  sx={{
                    position: "relative",
                    borderRadius: "calc(0.1em + 0.5vw)",
                    width: "50%",
                    right: "0px",
                    pl: "calc(1.5vw)",
                    pr: "calc(1.8vw)",
                    marginTop: "1em",
                  }}
                >
                  Create Team
                </Button>
              </Box>
            </FormControl>
          </Typography>
        ) : null}

        <Box sx={{ position: "relative", left: "3svw", overflow: "scroll" }}>
          {/* Dynamically renders the teams within the league */}
          {teamState.Teams !== null
            ? teamState.Teams.map((team, index) => (
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
                  username={user && user.Username}
                  leagueInfo={teamState}
                  teamIndex={index}
                  updateLeague={updateLeague}
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
