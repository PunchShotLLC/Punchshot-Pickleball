import { Header } from "../../components/header/header.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { hslToRgb, styled } from "@mui/system";
import * as React from 'react';
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight.js'
import { FeedItem } from "../../components/FeedItem/feedItem.js";
import { makeStyles } from "@mui/material";
import '../Results/results.scss'
import "@fontsource/inter";
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { ListItem } from "@mui/material";
import ResultsTable from "./ResultsTable.js";
import { ClassNames } from "@emotion/react";



export const Results = () => {
  return (
  
    <Box sx={{width: '80vw', height: '77.69vh', display: 'flex'}}>
      
      <Box sx = {{position: "relative", width: '100%', top : "1.5%", height: '100%', display: "flex", flexDirection: "column"}}>
        
        <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%'}}>
          RESULTS
        </Typography>
        <Typography className="bodyText" sx={{ display: "absolute", fontSize: 'calc(0.5em + 1vw)', fontWeight: 'bold', pt: '0%', top: '10%'}}>
          Previous Entries
        </Typography>
        <Box sx = {{position: "relative", top : '5%', left: '2vw'}}>
          <Box sx = {{position: "absolute", top: '102%', left: '9.5%', width: '100%', height: '100%', display: "flex", flexDirection: 'row'}}>
          <Button sx = {{
              margin: "0 10vw 0 0",
              fontFamily: 'inter',
              fontSize: 'calc(1.4vw)',
              fontWeight: '400',
              width: "12vw",
              height: "4vw",
              backgroundColor: "#9146D8",
              borderRadius: "0",
              "&:hover": {
                backgroundColor: "#6C27B4",
                transition: 'background-color 0.15s ease-in',
              },
              
              }} variant="contained" color="secondary" endIcon = {<KeyboardArrowRight
                sx = {{
                color: "white",
                transform: "scaleY(2) scaleX(2)",}}    
              />}>
              COMPETE
            </Button>
            <Button sx = {{
              margin: "0 10vw 0 0",
              fontFamily: 'inter',
              fontSize: 'calc(1.4vw)',
              fontWeight: '400',
              width: "17vw",
              height: "4vw",
              backgroundColor: "BLACK",
              borderRadius: "0",
              "&:hover": {
              backgroundColor: "#6C27B4",
              transition: 'background-color 0.15s ease-in',
              },
              
              }} variant="contained" color="secondary" endIcon = {<KeyboardArrowRight
                sx = {{
                color: "white",
                transform: "scaleY(2) scaleX(2)",}}    
              />}>
              CREATE LEAGUE
            </Button> 
            <Button sx = {{
              margin: "0 12vw 0 0",
              fontFamily: 'inter',
              fontSize: 'calc(1.4vw)',
              fontWeight: '400',
              width: "18vw",
              height: "4vw",
              backgroundColor: "#9146D8",
              borderRadius: "0",
              "&:hover": {
                backgroundColor: "#6C27B4",
                transition: 'background-color 0.15s ease-in',
              },
              
              }} variant="contained" color="secondary" endIcon = {<KeyboardArrowRight
                sx = {{
                color: "white",
                transform: "scaleY(2) scaleX(2)",}}    
              />}>
              FIND LEAGUES
            </Button>  
          </Box>
          
          <ResultsTable/>
          
        </Box>
      </Box>
      
    </Box>
  );
  
};
