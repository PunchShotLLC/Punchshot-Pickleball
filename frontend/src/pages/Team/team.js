import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import '../League/league.scss'
import "@fontsource/inter";
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/InputBase';
import { FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';

import { TeamSelectButton } from "./teamSelectButton";

const StyledInput = styled(TextField)({
    borderRadius: '1em',
    border: '3px solid #000000',
    fontSize: 'calc(0.8vw + 0.1em)',
    width: "30vw",
    paddingLeft: "1vw"
  });
  
const StyledLabel = styled('label')({
  paddingLeft: "1vw",
  marginBottom: "0.5vh",
});

const buttonTheme = createTheme({
  palette: {
      primary: {
          main: '#9146D8',
      },
      secondary: {
          main: '#D9D9D9',
      }
  }
})

const generateRandomName = () => {
  return uuidv4().slice(0, 9);
}

export const TeamSelect = (props) => {

    // location.state holds the info about the league
    const location = useLocation();

    // Three states for the input for a new team
    const [teamName, setTeamName] = useState(null)

    // Adds the team to the league
    const addTeamToLeague = () => {

        // Make a copy of the league, add the new team
        const leagueInfo = location.state
        console.log(leagueInfo)
        leagueInfo['Teams'].push(
            {
                TeamName: teamName,
                TeamCaptain: generateRandomName(),
                TeamMembers: [],
                TeamFee: 20
            }
        )

        // Make a patch request to the leagues API with the updated league object
        const requestOptions = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(leagueInfo),
          };

        // Make the PATCH request to update the leagues
        const apiUrl = `http://localhost:8000/leagues/updateLeague/${location.state["_id"]}`
        
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    // Adds a player to a team
    const addPlayerToTeam = (teamIndex) => {
      // Add the player to the team's player list
      let playerList = location.state.Teams[teamIndex].TeamMembers
      playerList.push(generateRandomName())

      // Make the PATCH request to update the leagues
      const apiUrl = `http://localhost:8000/leagues/updateLeague/${location.state["_id"]}`

      const requestOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location.state),
      };
        
      fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((responseData) => {
              console.log(responseData)
          })
          .catch((error) => {
              console.error('Error:', error);
          });
    }

    console.log(location.state)

    return (
        <Box sx={{width: '80vw', height: '77.69vh', display: 'flex'}}>


        <Box sx = {{position: "relative", width: '100%', height: '100%', display: "flex", flexDirection: "column"}}>

          <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%', align: 'center', marginLeft: '10vw'}}>
            {location.state.LeagueName}
          </Typography>
          <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
            Number of Teams: {location.state.Teams.length}
          </Typography>
          <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
            Zip Code: {location.state.ZipCode}
          </Typography>
          <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
            City: {location.state.City}
          </Typography>
          <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
            Start Date: {location.state.StartDate}
          </Typography>
          <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
            End Date: {location.state.EndDate}
          </Typography>
          <Box sx = {{position: "relative", left: '3svw'}}>


          {/* Dynamically renders the teams within the league */}
          {location.state.Teams !== null ? location.state.Teams.map((item, index) => (
            <TeamSelectButton 
              onClick={() => {addPlayerToTeam(index)}} 
              name={location.state.Teams[index].TeamName} 
              captain={location.state.Teams[index].TeamCaptain}
              players={location.state.Teams[index].TeamMembers}
            />
          )) : null}
      
          <Box sx = {{width: '45vw', height: '4vh', display: 'flex'}}>

          </Box>
            <Box sx = {{position: "absolute", top: '102%', left: '9.5%', width: '100%', height: '100%', display: "flex", flexDirection: 'row'}}>
            
            </Box>


          </Box>
        </Box>

        <Box sx={{width: '45vw', height: '77.69vh', display:"flex", justifyContent:"space-between", alignItems: 'flex-start',
            flexDirection: 'column'}}>
          <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%'}}>
            CREATE TEAM
          </Typography>
          <Box sx={{height:"70vh", width:'40vw', marginLeft:'5vw', borderLeft:'2px solid rgba(145, 70, 216, 1)'}} >
                      <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                          <StyledLabel htmlFor="leagueName">Team Name<span style={{color:"red"}}>*</span></StyledLabel>
                          <StyledInput onChange={(event) => setTeamName(event.target.value)} id="leagueName" placeholder="Atlanta Classic Team" required />
                      </FormControl>
                      <ThemeProvider theme={buttonTheme}>
                      <div className='login_button_grid'>
                          <Button variant='contained' color='secondary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.5vw)', pr: 'calc(1.8vw)'}}>Clear Inputs</Button>
                          <Button onClick={addTeamToLeague} variant='contained' color='primary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.5vw)', pr: 'calc(1.8vw)'}}>Create Team</Button>
                      </div>
                      </ThemeProvider>
            </Box>
        </Box>
      </Box>
    )
}