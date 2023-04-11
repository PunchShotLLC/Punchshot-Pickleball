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
import Grid from '@mui/material/Grid';
import CustomizedInputs from "../../components/login/CustomInput";



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

      <Box sx={{width: '40vw', height: '77.69vh', display: 'flex', alignItems}}>
      <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%', marginLeft: '9vw', marginBottom: '73vh'}}>
          CREATE LEAGUE
        </Typography>

        </Box>
       
    </Box>
  );
};