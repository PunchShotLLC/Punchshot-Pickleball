import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from 'react';
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import '../League/league.scss'
import "@fontsource/inter";
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import LeagueGrid from "./leagueGrid.js";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/InputBase';
import { FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export const League = () => {

  const [leagueName, setLeagueName] = useState(null)
  const [numTeams, setNumTeams] = useState(null)
  const [zipCode, setZipCode] = useState(null)
  const [city, setCity] = useState(null)
  const [leagues, setLeagues] = useState(null)

  /*
  Function to create a league with the values currently in the input boxes
  */
  const createLeague = async () => {
    // Put the parameters in the request body
    const body = {
      LeagueName: leagueName,
      NumTeams: numTeams,
      ZipCode: zipCode,
      City: city
    }

    // Create POST request
    // Catch error if exists
    const rawResponse = await fetch('http://localhost:8000/leagues/createLeague', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).catch(err => console.log(err));

    const content = await rawResponse.json();

    console.log(content);
  }

  const getLeagues = async () => {
    const rawResponse = await fetch('http://localhost:8000/leagues/').catch(err => console.log(err));
    const content = await rawResponse.json();

    console.log(content)
    setLeagues(content)
  }

  useEffect(() => {
    getLeagues()
  }, []);

  return (

    <Box sx={{width: '80vw', height: '77.69vh', display: 'flex'}}>

      <Box sx = {{position: "relative", width: '100%', height: '100%', display: "flex", flexDirection: "column"}}>

        <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%', align: 'center', marginLeft: '10vw'}}>
          MY LEAGUE
        </Typography>
        <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
          Atlanta Enthusiasts
        </Typography>
        <Box sx = {{position: "relative", left: '3svw'}}>

        {/* <LeagueGrid/> */}

  
        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 1.5vw)', fontWeight: 'bold', align: 'center', marginLeft: '15vw', color: '#9146D8', marginTop: '1vh'}}>
          League statistics
        </Typography>
    
        <Box sx = {{width: '45vw', height: '4vh', display: 'flex'}}>

        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.6vw)', fontWeight: 'bold', align: 'center', alignitems: 'baseline', display: 'flex', marginLeft: '4vw'}}>
          Competitors: 25       
        </Typography>
        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.6vw)', fontWeight: 'bold', align: 'center', alignitems: 'baseline', display: 'flex', marginLeft: '1.5vw'}}>
        Games Played: 125           
        </Typography>
        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.6vw)', fontWeight: 'bold', align: 'center', alignitems: 'baseline', display: 'flex', marginLeft: '1.5vw'}}>
        League Participation: 98%
        </Typography>

        </Box>
          <Box sx = {{position: "absolute", top: '102%', left: '9.5%', width: '100%', height: '100%', display: "flex", flexDirection: 'row'}}>
          
          </Box>


        </Box>
      </Box>

      <Box sx={{width: '45vw', height: '77.69vh', display:"flex", justifyContent:"space-between", alignItems: 'flex-start',
          flexDirection: 'column'}}>
        <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%'}}>
          CREATE LEAGUE
        </Typography>
        <Box sx={{height:"70vh", width:'40vw', marginLeft:'5vw', borderLeft:'2px solid rgba(145, 70, 216, 1)'}} >
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="leagueName">League Name <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput onChange={(event) => setLeagueName(event.target.value)} id="leagueName" placeholder="Atlanta Classic League" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="nbCompetitors">Number of Teams <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput onChange={(event) => setNumTeams(event.target.value)} id="nbCompetitors" placeholder="5" required />
                    </FormControl>
                    {/* <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="skillLevel">Skill Level <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="skillLevel" placeholder="Beginner" required />
                    </FormControl> */}
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="zipCode">Zip Code <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput onChange={(event) => setZipCode(event.target.value)} id="zipCode" placeholder="30332" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="city">City <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput onChange={(event) => setCity(event.target.value)} id="city" placeholder="Atlanta" required />
                    </FormControl>
                    {/* <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="prize">Prize </StyledLabel>
                        <StyledInput id="prize" placeholder="$1000" required />
                    </FormControl> */}
                    {/* <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="email">Email <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="email" placeholder="email@example.com" required />
                    </FormControl> */}
                    <ThemeProvider theme={buttonTheme}>
                    <div className='login_button_grid'>
                        <Button variant='contained' color='secondary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.5vw)', pr: 'calc(1.8vw)'}}>Clear Inputs</Button>
                        <Button onClick={createLeague} variant='contained' color='primary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.5vw)', pr: 'calc(1.8vw)'}}>Create League</Button>
                    </div>
                    </ThemeProvider>
          </Box>
      </Box>
    </Box>
  );
};