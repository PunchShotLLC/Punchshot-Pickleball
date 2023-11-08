import * as React from "react";
import "./teamSelectButton.css";
import { Button } from "@mui/material";

export const TeamSelectButton = (props) => {

  console.log(props)

  const addPlayerToTeam = async (teamIndex, username) => {

    // Add the player to the team's player list
    let playerList = props.leagueInfo.Teams[teamIndex].TeamMembers;
    playerList.push(username);

    // Remove the player from the potential player list
    let potentialPlayerList = props.leagueInfo.Teams[teamIndex].PotentialTeamMembers;
    potentialPlayerList = potentialPlayerList.filter(e => e !== username)
    props.leagueInfo.Teams[teamIndex].PotentialTeamMembers = potentialPlayerList

    // Make the PATCH request to update the leagues
    const apiUrl = `http://localhost:8000/leagues/updateLeague/${props.leagueInfo["_id"]}`;

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.leagueInfo),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="team-select-button">
      <h2 className="team-select-text">{props.name}</h2>
      <p className="team-select-text">Captain: {props.captain}</p>
      <p className="team-select-text">Members: </p>
      {props.members.map((item, index) => (
        <p>{props.members[index]}</p>
      ))}
      <p className="team-select-text">Home Court Address: {props.home} </p>
      {props.showPotentialMembers === true ? 
      <>
        <p className="team-select-text">Potential Members: </p>
        {props.potentialMembers.map((item, index) => (
          <p onClick={()=>addPlayerToTeam(props.teamIndex, props.potentialMembers[index])} className="potential-team-member">{props.potentialMembers[index]}</p>
        ))}
      </> :
      null
      }
      <Button onClick={props.onClick}>Request to Join</Button>
    </div>
  );
};
