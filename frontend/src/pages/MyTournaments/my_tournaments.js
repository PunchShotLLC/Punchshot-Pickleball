import { Header } from "../../components/header/header";
import "./my_tournaments.scss"
import CustomInputTournament from './CustomInputTournament.js'
import Box from "@mui/material/Box";
import { ThemeProvider, fontFamily, fontSize, fontWeight, styled } from "@mui/system";
import * as React from "react";
import defaultImage from "../Profile/default.png";
import raquetImage from "../Profile/raquet.png";
import Typography from "@mui/material/Typography";
import { FeedItem } from "../../components/FeedItem/feedItem.js";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { useState } from "react"
import axios from 'axios'

const theme = createTheme({
  palette: {
    neutral: {
      main: '#CCC',
      contrastText: '#FFF',
    },
  },
});

let formDisplayError = false;

export const MyTournaments = () => {
  const [displayFormError, setDisplayFormError] = useState(false);

  const createTournamentHandler = function() {
    let inputs = Array();
    for (let index = 0; index < 6; index++) { // 6 fields in form
      const temp = document.getElementById("tournament_input_"+index).value;
      if (temp == null || temp.length == 0) {
        setDisplayFormError(true);
        return;
      }
      inputs.push(temp);
    }
    setDisplayFormError(false);
    axios({
      method: 'post',
      url: 'http://localhost:5001/tournaments/add',
      data: {
        Tournament_Name: inputs[0],
        Skill_Level: inputs[1],
        Divisions_Offered: inputs[2],
        Entry_Fee: inputs[3],
        Prize: inputs[4],
        Registration_Deadline: inputs[5]
      }
    });
  }

  return (
    <Box 
      sx={{
        height: "77.69vh",
        width: "85vw",
        display: "flex",
        }}
      >
      <Box
        sx={{
          height: "77.69vh",
          width: "55vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography
          sx={{
            fontFamily: 'inter',
            fontWeight: "bold",
            fontSize: "calc(0.7em + 1vw)",
            color: "#9146D8",
          }}
        >
          MY TOURNAMENTS
        </Typography>
        <Box
          sx={{
            height: "77.69vh",
            width: "55vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
        </Box>
      </Box>
      <Box
        sx={{
          height: "75vh",
          width: "30vw",
          borderLeft: "2px solid rgba(145, 70, 216, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: 'inter',
            fontWeight: "bold",
            fontSize: "calc(0.7em + 1vw)",
            color: "#9146D8",
          }}
        >
          CREATE TOURNAMENT
        </Typography>
        {
          displayFormError ? 
          <Typography sx={{color: "#FF0000"}}>
            Missing some required fields
          </Typography>
          : <div></div>
        }
        <div className="tournament_div">
          <Typography
            sx={{
              alignSelf: "start",
              paddingLeft: "3%"
            }}
          >
            Tournament Name <font color={"#ff0000"}> * </font>
          </Typography>
          <div>
            <CustomInputTournament id="tournament_input_0" />
          </div>
        </div>
        <div className="tournament_div">
          <Typography
            sx={{
              alignSelf: "start",
              paddingLeft: "3%"
            }}
          >
            Skill Level <font color={"#ff0000"}> * </font>
          </Typography>
          <div>
            <CustomInputTournament id="tournament_input_1" />
          </div>
        </div>
        <div className="tournament_div">
          <Typography
            sx={{
              alignSelf: "start",
              paddingLeft: "3%"
            }}
          >
            Divisions Offered <font color={"#ff0000"}> * </font>
          </Typography>
          <div>
            <CustomInputTournament id="tournament_input_2" />
          </div>
        </div>
        <div className="tournament_div">
          <Typography
            sx={{
              alignSelf: "start",
              paddingLeft: "3%"
            }}
          >
            Entry Fee <font color={"#ff0000"}> * </font>
          </Typography>
          <div>
            <CustomInputTournament id="tournament_input_3" />
          </div>
        </div>
        <div className="tournament_div">
          <Typography
            sx={{
              alignSelf: "start",
              paddingLeft: "3%"
            }}
          >
            Prize <font color={"#ff0000"}> * </font>
          </Typography>
          <div>
            <CustomInputTournament id="tournament_input_4" />
          </div>
        </div>
        <div className="tournament_div">
          <Typography
            sx={{
              alignSelf: "start",
              paddingLeft: "3%"
            }}
          >
            Registration Deadline <font color={"#ff0000"}> * </font>
          </Typography>
          <div>
            <CustomInputTournament id="tournament_input_5" />
          </div>
        </div>
        <div className="tournament_button_div">
          <ThemeProvider theme={theme}>
            <Button variant='contained' color='neutral' sx={{ flex: 3, position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.8vw)', pr: 'calc(1.8vw)', mr: 'calc(1vw)' }}>Clear Inputs</Button>
          </ThemeProvider>
          <Button onClick={createTournamentHandler} variant='contained' color='primary' sx={{ flex: 5, position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.8vw)', pr: 'calc(1.8vw)' }}>Create Tournament</Button>
        </div>
      </Box>
    </Box>
  );
};
