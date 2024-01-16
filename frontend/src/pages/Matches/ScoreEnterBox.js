import * as React from "react";
import { useState } from "react";

export default function ScoreEnterBox(props) {

  const handleSubmit = (e) => {
    let form = document.getElementById("score-edit-form");
    var selectedOption = null;

    // Loop through radio buttons to find the selected one
    for (var i = 0; i < form.choice.length; i++) {
      if (form.choice[i].checked) {
        selectedOption = form.choice[i].value;
        break;
      }
    }

    // Make sure the user has selected an option
    if (selectedOption === null) {
      alert("Please select an option.");
      return;
    }

    console.log("Selected option");
    console.log(selectedOption);

    // Set the appropriate values in the league object based on selected option
    if (selectedOption === "team1wins20") {
      props.league["Matches"][props.matchIndex]["WinnerTeam"] =
        props.match["team1"];
      props.league["Matches"][props.matchIndex]["Score"] = "2-0";
    } else if (selectedOption === "team2wins20") {
      props.league["Matches"][props.matchIndex]["WinnerTeam"] =
        props.match["team2"];
      props.league["Matches"][props.matchIndex]["Score"] = "2-0";
    } else if (selectedOption === "team1wins21") {
      props.league["Matches"][props.matchIndex]["WinnerTeam"] =
        props.match["team1"];
      props.league["Matches"][props.matchIndex]["Score"] = "2-1";
    } else if (selectedOption === "team2wins21") {
      props.league["Matches"][props.matchIndex]["WinnerTeam"] =
        props.match["team2"];
      props.league["Matches"][props.matchIndex]["Score"] = "2-1";
    }

    // Make the patch request to update the leagues
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.league),
    };

    // Make the PATCH request to update the leagues
    const apiUrl = `http://localhost:8000/leagues/updateLeague/${props.league["_id"]}`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("ENTER SCORE BOX LEAGIUE");
  console.log(props.league);
  console.log(props.match);

  return (
    <div id="score-enter-box">
      <form id="score-edit-form" onSubmit={handleSubmit}>
        <p>Select the outcome of the match:</p>
        <label for="team1wins20">
          <input
            type="radio"
            id="team1wins20"
            name="choice"
            value="team1wins20"
          />
          {props.match["team1"]} won 2-0
        </label>
        <br />
        <label for="team1wins21">
          <input
            type="radio"
            id="team1wins21"
            name="choice"
            value="team1wins21"
          />
          {props.match["team1"]} won 2-1
        </label>
        <br />
        <label for="team2wins20">
          <input
            type="radio"
            id="team2wins20"
            name="choice"
            value="team2wins20"
          />
          {props.match["team2"]} won 2-0
        </label>
        <br />
        <label for="team1wins21">
          <input
            type="radio"
            id="team2wins21"
            name="choice"
            value="team2wins21"
          />
          {props.match["team2"]} won 2-1
        </label>
        <br />

        <button submit={handleSubmit}>Submit</button>
        <br />
      </form>
      <br />
    </div>
  );
}
