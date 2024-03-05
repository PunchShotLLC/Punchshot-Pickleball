import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import * as React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../components/UserContext/usercontext";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import "../League/league.css";
import "@fontsource/inter";
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  FormControl,
  Container,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCookies } from "react-cookie";
import axios from "axios";
import { TeamSelectButton } from "./teamSelectButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // overflowY: "auto",
  // margin: "32px",
});

const StyledInput = styled(InputBase)({
  borderRadius: "5px",
  background: "white",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "100%",
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "5px",
  paddingBottom: "5px",
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
let leagueName = "";
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
  const [searchedTeamName, setSearchedTeamName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const textFieldRef = useRef(null);

  const StyledForm = styled("form")({
    backgroundColor: "white",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // gap: "16px",
    width: "calc(100% - 64px)",
    maxWidth: "600px",
    height: `calc(${suggestions.length > 0 ? "100% - 64px" : "60% - 64px"})`,
  });

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

  const handleModalClick = () => {
    setHomeCourtAddress("");
    setSuggestions([]);
    setShowTeamCreationForm(false);
  };

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
    handleModalClick();
  };

  /**
   * Drops a team from the league
   * @param {int} teamIndex index of the team in the teamState.Teams array
   */
  const dropTeamFromLeague = async (teamIndex) => {
    const apiUrl = `http://localhost:8000/leagues/deleteTeam/${teamState["_id"]}/${teamState.Teams[teamIndex]["_id"]}`;
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

  const removePlayerFromTeam = async (teamIndex) => {
    if (!user) {
      console.log("not signed in");
      return;
    }

    let PlayerList = teamState.Teams[teamIndex].TeamMembers;
    console.log(PlayerList);

    var leagueInfo = teamState;

    //find user in memberlist and remove from memberlist
    let userIndex = PlayerList.indexOf(user.Username);
    if (userIndex === -1) {
      alert("User already not in team");
      return;
    }
    leagueInfo.Teams[teamIndex].TeamMembers.splice(userIndex, 1);
    alert("Leaving team");

    // Update the league with the new league object
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
    setHomeCourtAddress(suggestion.description);
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const test = 5;

  const getLeagueName = async () => {
    try {
      leagueName = location.state.LeagueName;
      console.log(leagueName);
    } catch (error) {
      console.error("Error fetching league data:", error);
    }
  };
  getLeagueName();

  // prevent loss foucs on textfield after the Box height is resized
  useEffect(() => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  });

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginY: "1em",
        }}
      >
        <Typography
          className="titleText"
          sx={{
            fontSize: "calc(1em + 1.5vw)",
            fontWeight: "bold",
          }}
        >
          {leagueName}
        </Typography>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "linear-gradient(90.41deg, #9146D8 0%, #D5FD51 99.85%)",
            borderRadius: "5px",
            padding: "1px",
            position: "relative",
          }}
        >
          <StyledInput
            onChange={(e) => {
              setSearchedTeamName(e.target.value);
            }}
            placeholder="Search a Team"
          />
          {showTeamCreationForm ? null : (
            <IconButton
              onClick={() => setShowTeamCreationForm(true)}
              variant="contained"
              color="primary"
              sx={{
                height: "75%",
                position: "absolute",
                margin: "93%",
                zIndex: "1",
                color: "black",
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <StyledModal open={showTeamCreationForm} onClose={handleModalClick}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "16px",
            p: 4,
          }}
        >
          <Typography variant="h5">Create New Team</Typography>
          <Box
            marginTop={3}
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <TextField
              fullWidth
              required
              label="Team Name"
              variant="outlined"
              onChange={(event) => setTeamName(event.target.value)}
            />
            <TextField
              fullWidth
              multiline
              required
              label="Home Court Address"
              variant="outlined"
              value={homeCourtAddress}
              onChange={(event) => handleHomeCourtAddressChange(event)}
            ></TextField>
          </Box>

          {suggestions.length > 0 && (
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItemButton
                  onClick={() => handleSuggestionClick(suggestion)}
                  divider
                >
                  <ListItemText primary={suggestion.description} />
                </ListItemButton>
              ))}
            </List>
          )}

          <Typography
            sx={{
              display: "block",
              fontSize: "calc(0.5em + 0.5vw)",
              color: "gray",
            }}
          >
            * Ensuring court availability is your team’s responsibility.
          </Typography>

          <Typography
            sx={{
              fontSize: "calc(0.5em + 0.5vw)",
              color: "red",
              marginBottom: "0.5em",
              visibility: homeCourtMessage ? "visible" : "hidden",
            }}
          >
            {homeCourtMessage}
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"row"}
            width={"100%"}
            marginBottom={1}
          >
            <Button onClick={handleModalClick} variant="contained" color="grey">
              Cancel
            </Button>

            <Button
              onClick={addTeamToLeague}
              variant="contained"
              color="primary"
              sx={{ marginLeft: "auto" }}
            >
              Create Team
            </Button>
          </Box>
        </Box>
      </StyledModal>

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
          <Box sx={styles.main}>
            <Box sx={styles.side}>
              {/* Dynamically renders the teams within the league */}
              {teamState.Teams !== null
                ? teamState.Teams.filter((team) => {
                    if (
                      team.TeamName.toLowerCase().includes(
                        searchedTeamName.toLowerCase()
                      )
                    ) {
                      return team;
                    }
                    return null;
                  }).map((team, index) => (
                    <TeamSelectButton
                      onClick={() => {
                        addPlayerToPotentialList(index);
                        console.log("Addplayertopotentiallist");
                      }}
                      onClickRemoveUser={() => {
                        console.log("Remove User Is Running");
                        removePlayerFromTeam(index);
                      }}
                      onClickDropTeam={() => {
                        console.log("Drop team is running");
                        dropTeamFromLeague(index);
                      }}
                      name={teamState.Teams[index].TeamName}
                      captain={teamState.Teams[index].TeamCaptain}
                      members={teamState.Teams[index].TeamMembers}
                      home={teamState.Teams[index].HomeCourtAddress}
                      potentialMembers={
                        teamState.Teams[index].PotentialTeamMembers
                      }
                      showPotentialMembers={
                        user &&
                        user.Username === teamState.Teams[index].TeamCaptain
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
      </Box>
    </>
  );
};
const styles = {
  side: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "10vh",
    marginBottom: TeamSelect.isSmallScreen ? "2%" : "1%",
    marginLeft: TeamSelect.isSmallScreen ? "1%" : "2%",
  },
  main: {
    backgroundColor: "#F5F5F5",
    borderRadius: "10px",
    height: "16vh",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "20px",
    marginBottom: TeamSelect.isSmallScreen ? "2%" : "3%",
  },
};
