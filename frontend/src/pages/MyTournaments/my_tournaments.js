import { Header } from "../../components/header/header";
import "./my_tournaments.scss"
import CustomInputLeague from './CustomInputLeague.js'
import Box from "@mui/material/Box";
import { ThemeProvider, fontFamily, fontSize, fontWeight, styled } from "@mui/system";
import * as React from "react";
import defaultImage from "../Profile/default.png";
import raquetImage from "../Profile/raquet.png";
import Typography from "@mui/material/Typography";
import { FeedItem } from "../../components/FeedItem/feedItem.js";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    neutral: {
      main: '#CCC',
      contrastText: '#FFF',
    },
  },
});

export const MyTournaments = () => {
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
            <CustomInputLeague />
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
            <CustomInputLeague />
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
            <CustomInputLeague />
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
            <CustomInputLeague />
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
            <CustomInputLeague />
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
            <CustomInputLeague />
          </div>
        </div>
        <div className="tournament_button_div">
          <ThemeProvider theme={theme}>
            <Button variant='contained' color='neutral' sx={{ flex: 3, position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.8vw)', pr: 'calc(1.8vw)', mr: 'calc(1vw)' }}>Clear Inputs</Button>
          </ThemeProvider>
          <Button variant='contained' color='primary' sx={{ flex: 5, position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.8vw)', pr: 'calc(1.8vw)' }}>Create Tournament</Button>
        </div>
      </Box>
    </Box>
  );
};
