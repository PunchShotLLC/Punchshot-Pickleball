import React from "react";
import { Typography, Box } from "@mui/material";
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import courtPicture from "../../assets/images/Rectangle27.png";
import "./about.scss";

export const About = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "77.69vh",
          zIndex: "0",
        }}
      >
        <Box sx ={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          width: "50%",
          height: "77.69vh",
          zIndex: 2,
          alignContent: "leading",}}>
          <Typography
            align="left"
            sx={{
              paddingLeft: "4.33%",
              paddingRight: "3.33%",
              paddingTop: "3.33%",
              fontSize: "calc(1.4em + 1vw)",
              fontWeight: 700,
              fontFamily: "inter",
              zIndex: 4,
              color: "white",
            }}
          >
            MISSION
          </Typography>
          <Typography
            align="left"
            sx={{
              paddingLeft: "4.33%",
              paddingRight: "26.33%",
              fontSize: "calc(0.16em + 1vw)",
              fontWeight: 400,
              fontFamily: "inter",
              zIndex: 4,
              color: "white",
            }}
          >
            The mission of the Punchshot Pickleball is to promote the
            development and growth of pickleball in the greater Atlanta
            community through coaching, tournaments, leagues, and pickup games.
          </Typography>
          <Typography
            align="left"
            sx={{
              paddingLeft: "4.33%",
              paddingRight: "3.33%",
              paddingTop: "6.5vh",
              fontSize: "calc(1.4em + 1vw)",
              fontWeight: 700,
              fontFamily: "inter",
              zIndex: 4,
              color: "white",
            }}
          >
            ABOUT US
          </Typography>
          <Typography
            align="left"
            sx={{
              paddingLeft: "4.33%",
              paddingRight: "26.33%",
              fontSize: "calc(0.16em + 1vw)",
              fontWeight: 400,
              fontFamily: "inter",
              zIndex: 4,
              color: "white",
              marginBottom: "auto",
            }}
          >
            Punchshot was established in the Alanta area as a way to foster the evergrowing pickleball community. Whether you are a beginner, intermediate, or professional we've got a place for you! Our platform is divided into different leagues players can join. Once in a league, players have the ability to join a team or create a new team in order to compete in tournament play. Tournaments are round robin style in which each team will compete against another in their respective league until a winner is determined. Have more questions? Feel free to contact us!
          </Typography>
          <Box
            sx={{
              marginTop: "auto",
            }}
          >
            
          </Box>
        </Box>
        <Box
          className="rightDiv"
          sx={{
            backgroundColor: "white",
            width: "50%",
            height: "100%",
            zIndex: 2,
            position: "relative",
          }}
        >
          <Box
            className="PurpleBox"
            sx={{
              backgroundColor: "#9146D8",
              width: "92.84%",
              height: "89%",
              zIndex: 3,
              mt: "7%",
            }}
          ></Box>
          <img
            className="courtPicture"
            src={courtPicture}
            position="relative"
            width="99.12%"
            height="90%"
            zIndex="4"
          />
        </Box>
      </Box>
    </Box>
  );
};