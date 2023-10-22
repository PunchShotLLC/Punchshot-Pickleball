import * as React from "react";
import "./leagueButton.css";

export const LeagueButton = (props) => {
  return (
    <div className="league-select-button" onClick={props.onClick}>
      <h2 className="league-select-text">{props.name}</h2>
      <p className="league-select-text">
        Number of Teams: {props.numberOfTeams}
      </p>
      <p className="league-select-text">
        Teams Signed Up: {props.teamsSignedUp}
      </p>
      <p className="league-select-text">
        Start Date: {new Date(props.startDate).toLocaleDateString()}
      </p>
      <p className="league-select-text">
        End Date: {new Date(props.endDate).toLocaleDateString()}
      </p>
      <p className="league-select-text">City: {props.city}</p>
    </div>
  );
};
