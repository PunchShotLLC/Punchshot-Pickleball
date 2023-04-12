import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomizedInputs from "./CustomizedInputs";
import TournamentTable from "./TournamentTable";
import { alpha } from "@mui/material/styles";
import AntTab from "./AntTab";

export const Tournaments = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "77.69vh",
          left: "0px",
          background: "linear-gradient(100.59deg, #A1C038 0%, #000000 100%)",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "calc(1.7em + 1vw)",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1vw",
          }}
        >
          COMPETE IN TOURNAMENTS
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              width: "44%",
              color: "white",
              fontFamily: "Inter",
              fontSize: "1rem",
              fontWeight: "400",
              textAlign: "center",
              paddingTop: ".5vw",
            }}
          >
            It’s time to level up your game. Compete in tournaments against
            people in your skill level in singles or doubles divisions to win
            prizes!
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "1rem",
            fontWeight: "700",
            textAlign: "center",
            paddingTop: "1.7em",
          }}
        >
          Find a tournament in your area!
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            sx={{
              width: "60%",
              paddingTop: ".3rem",
            }}
          >
            <CustomizedInputs />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingTop="3em"
          paddingBottom="3em"
        >
          <AntTab />

          <Box
            sx={{
              width: "80%",
              paddingLeft: "1em",
              paddingRight: "1em",
              borderRadius: 4,
              backgroundColor: "#ffffff",
              border: "3px solid #D5FD51",
              "&:hover": {
                boxShadow: `${alpha("#ffffff", 0.25)} 0 0 0 0.2rem`,
              },
            }}
          >
            <TournamentTable />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
