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



export const League = () => {
  return (

    <Box sx={{width: '50vw', height: '77.69vh', display: 'flex'}}>

      <Box sx = {{position: "relative", width: '100%', top : "1.5%", height: '100%', display: "flex", flexDirection: "column"}}>

        <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%'}}>
          RESULTS
        </Typography>
        <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', pt: '0%', top: '10%'}}>
          Previous Entries
        </Typography>
        <Box sx = {{position: "relative", top : '5%', left: '2vw'}}>
          <Box sx = {{position: "absolute", top: '102%', left: '9.5%', width: '100%', height: '100%', display: "flex", flexDirection: 'row'}}>
          
          </Box>

          <LeagueGrid/>

        </Box>
      </Box>

    </Box>
  );
};