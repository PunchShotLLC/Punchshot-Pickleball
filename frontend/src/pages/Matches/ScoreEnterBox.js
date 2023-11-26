import * as React from 'react';
import { useEffect, useState } from 'react';
import './ScoreEnterBox.css'

export default function ScoreEnterBox(props) {

    const [teamWinner, setTeamWinner] = useState('');
    const [scoreInput, setScoreInput] = useState('');


    const handleSubmit = (e) => {
    
        // Update the winner team and score fields in the league object
        props.league['Matches'][props.matchIndex]['WinnerTeam'] = teamWinner
        props.league['Matches'][props.matchIndex]['Score'] = scoreInput

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
    }

    console.log("ENTER SCORE BOX LEAGIUE")
    console.log(props.league)
    console.log(props.match)

    return (
        <div id="score-enter-box">
            <form onSubmit={handleSubmit}>
                <br/>
                {/* Question 1: Multiple Choice */}
                <label htmlFor="teamWinner">Which team won?</label>
                <br/>
                <select
                id="teamWinner"
                name="teamWinner"
                value={teamWinner}
                onChange={(e) => setTeamWinner(e.target.value)}
                required
                >
                <option value="">Select a team</option>
                <option value="Tie">Tie</option>
                <option value={props.match['team1']}>{props.match['team1']}</option>
                <option value={props.match['team2']}>{props.match['team2']}</option>
                </select>
                <br />

                {/* Question 2: Number Input */}
                <label htmlFor="scoreInput">Enter the score in the form #-#, where the first number is the winning team's # of wins</label>
                <br></br>
                <input
                    type="text"
                    id="scoreInput"
                    name="scoreInput"
                    value={scoreInput}
                    onChange={(e) => setScoreInput(e.target.value)}
                    required
                />
                <br />
                <br />

                {/* Submit Button */}
                <button submit={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}