import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from 'react';
import Typography from "@mui/material/Typography";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight.js'
import '../League/league.scss'
import "@fontsource/inter";
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import LeagueGrid from "./leagueGrid.js";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/InputBase';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';

const StyledInput = styled(TextField)({
  borderRadius: '1em',
  border: '3px solid #000000',
  fontSize: 'calc(0.8vw + 0.1em)',
  width: "30vw",
  paddingLeft: "1vw"
});

const StyledSelect = styled(Select)({
  borderRadius: '1em',
  border: '3px solid #000000',
  fontSize: 'calc(0.8vw + 0.1em)',
  height: "5h",
  width: "30vw",
  paddingLeft: "1vw",
  bottom: "1em"
});

const StyledLabel = styled('label')({
  paddingLeft: "1vw",
  marginBottom: "0.5vh",
});

export const League = () => {
  return (

    <Box sx={{width: '80vw', height: '77.69vh', display: 'flex'}}>

      <Box sx = {{position: "relative", width: '100%', height: '100%', display: "flex", flexDirection: "column"}}>

        <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%', align: 'center', marginLeft: '10vw'}}>
          MY LEAGUE
        </Typography>
        <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', align: 'center', marginLeft: '10vw'}}>
          Atlanta Enthusiasts
        </Typography>
        <Box sx = {{position: "relative", left: '5svw'}}>
        <LeagueGrid/>

  
        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.5vw)', fontWeight: 'bold', align: 'center', marginLeft: '20vw', color: '#9146D8', marginTop: '2vh'}}>
          League statistics
        </Typography>
    
        <Box sx = {{width: '40vw', height: '4vh', display: 'flex', marginLeft: '6vw'}}>

        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.5vw)', fontWeight: 'bold', align: 'center', alignitems: 'baseline', display: 'flex', }}>
          Competitors: 25       
        </Typography>
        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.5vw)', fontWeight: 'bold', align: 'center', alignitems: 'baseline', display: 'flex', marginLeft: '1.5vw'}}>
        Games Played: 125           
        </Typography>
        <Typography className="bodyText" sx={{fontSize: 'calc(0.5em + 0.5vw)', fontWeight: 'bold', align: 'center', alignitems: 'baseline', display: 'flex', marginLeft: '1.5vw'}}>
        League Participation: 98%
        </Typography>

        </Box>
          <Box sx = {{position: "absolute", top: '102%', left: '9.5%', width: '100%', height: '100%', display: "flex", flexDirection: 'row'}}>
          
          </Box>


        </Box>
      </Box>

      <Box sx={{width: '40vw', height: '77.69vh', display:"flex", justifyContent:"space-between", alignItems: 'flex-start',
          flexDirection: 'column'}}>
        <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%'}}>
          CREATE LEAGUE
        </Typography>
        <Box sx={{height:"70vh", width:'40vw', marginLeft:'5vw', borderLeft:'2px solid rgba(145, 70, 216, 1)'}} >
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="leagueName">League Name <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="leagueName" placeholder="Atlanta Leagueg" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="nbCompetitors">Number of Competitors <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="nbCompetitors" placeholder="5" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="skillLevel">Skill Level <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="skillLevel" placeholder="Beginner" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="zipCode">Zip Code <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="zipCode" placeholder="30332" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="city">City <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="city" placeholder="Atlanta" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="prize">Prize </StyledLabel>
                        <StyledInput id="prize" placeholder="$1000" required />
                    </FormControl>
                    <FormControl sx={{height:"5vw", marginLeft:'1.5vw'}}>
                        <StyledLabel htmlFor="email">Email <span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="email" placeholder="email@example.com" required />
                    </FormControl>
          </Box>
      </Box>
       
    </Box>
  );
};