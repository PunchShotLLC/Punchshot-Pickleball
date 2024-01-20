import * as React from "react";
import "./teamSelectButton.css";
import { Button, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from '@mui/icons-material/Close';
export const TeamSelectButton = (props) => {

  console.log(props)

  let isPotentialMember = props.leagueInfo.Teams[props.teamIndex].PotentialTeamMembers.some((name) => name === props.username)
  let inTeam = (props.members.some((obj) => obj === props.username) || props.username === props.captain)
  const addPlayerToTeam = async (teamIndex, username) => {

    // Add the player to the team's player list
    let playerList = props.leagueInfo.Teams[teamIndex].TeamMembers;
    let teamMember = props.leagueInfo.Teams.some((team) => team.TeamMembers.some(name => name === username));

    if (teamMember) {
      alert("Already in team")
      return;
    }

    if (playerList.length >= 5) {
      alert("Team is full")
      return;
    }

    playerList.push(username);

    // Remove the player from the potential player list
    let potentialPlayerList = props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter(e => e !== username)
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers = potentialPlayerList
    // Make the PATCH request to update the leagues
    props.updateLeague(props.leagueInfo)
  };
  const removePlayerToTeam = async (teamIndex, username) => {

    // Remove the player from the potential player list
    let potentialPlayerList = props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter(e => e !== username)
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers = potentialPlayerList

    // Make the PATCH request to update the leagues
    props.updateLeague(props.leagueInfo)
  };
  // There are nulls in the potential members list for some reason
  // This filters the nulls out
  let potentials = []
  for (let i = 0; i < props.potentialMembers.length; i++) {
    if (props.potentialMembers[i] !== null) {
      potentials.push(props.potentialMembers[i])
    }
  }

  return (
    <div className="team-select-button">
      <h2 className="team-select-text">{props.name}</h2>
      <h3 className="team-select-text">Captain:</h3>
      <div class='team-username-container'>
        <p>{props.captain}</p>
      </div>
      <p className="team-select-text">Members: </p>
      {props.members.map((item, index) => (
        <div class='team-username-container'>
          <p>{props.members[index]}</p>
        </div>
      ))}
      <p className="team-select-text">Home Court Address: {props.home} </p>
      {props.showPotentialMembers === true ?
        <>
          <p className="team-select-text">Potential Members (Click on a user to allow them into your team): </p>
          {potentials.map((item, index) => (
            <div class='pending-team-container' >
              <IconButton onClick={() => addPlayerToTeam(props.teamIndex, props.potentialMembers[index])}>
                <CheckIcon sx={{ color: "green" }} />
              </IconButton>
              <p className="potential-team-member">{props.potentialMembers[index]}</p>
              <IconButton onClick={() => removePlayerToTeam(props.teamIndex, props.potentialMembers[index])}>
                <CloseIcon sx={{ color: "red" }} />
              </IconButton>
            </div>
          ))}
        </> :
        null
      }
      {isPotentialMember ?
        <>
          {
            <div class='team-username-container' onClick={() => removePlayerToTeam(props.teamIndex, props.username)}>
              <p>Cancel Request</p>
            </div>
          }
        </> :
        null
      }
      <br></br>
      {
        isPotentialMember ?
          null :
          inTeam ?
            <Button onClick={props.onClickRemoveUser}> Leave Team </Button> :
            <Button onClick={props.onClick}>Request to Join</Button>
      }
    </div>
  );
};
