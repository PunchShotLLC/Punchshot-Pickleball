import { Header } from "../../components/header/header";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import * as React from "react";
import defaultImage from "./default.png";
import raquetImage from "./raquet.png";
import Typography from "@mui/material/Typography";
import { FeedItem } from "../../components/FeedItem/feedItem.js";

const StyledLabel = styled("p")({
  fontWeight: "bold",
  marginRight: "1vw",
  fontSize: "calc(0.8em + 1vw)",
  margin: "0px",
});

const StyledText = styled("p")({
  fontSize: "calc(0.8em + 1vw)",
  fontWeight: "300",
  margin: "0px",
});

export const Profile = () => {
  return (
    <Box sx={{ width: "85vw", height: "77.69vh", display: "flex" }}>
      <Box
        sx={{
          height: "77.69vh",
          width: "55vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "55vw",
            height: "30vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2vh",
          }}
        >
          <Box
            sx={{
              width: "15.5vw",
              height: "15.5vw",
              background:
                "linear-gradient(rgba(145, 70, 216, 1), rgba(213, 253, 81, 1))",
              display: "flex",
              alignItems: "center",
              marginRight: "2vw",
              justifyContent: "center",
              borderRadius: "40%",
            }}
          >
            <Box
              component="img"
              sx={{ height: "15vw", width: "15vw", borderRadius: "40%" }}
              src={defaultImage}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "13vw",
              fontWeight: "bold",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "rgba(145, 70, 216, 1)",
                fontWeight: "bold",
                fontSize: "calc(0.8em + 1vw)",
              }}
            >
              Default Player
            </Typography>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Age: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Sex: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Region: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Plays: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "55vw",
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{ height: "auto", width: "15.5vw" }}
            src={raquetImage}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "13vw",
              fontWeight: "bold",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "rgba(145, 70, 216, 1)",
                fontWeight: "bold",
                fontSize: "calc(0.8em + 1vw)",
              }}
            >
              Your Racket
            </Typography>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Brand: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Model: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Weight: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
            <Box sx={{ display: "flex" }}>
              <StyledLabel>Strengths: </StyledLabel>
              <StyledText>N/A</StyledText>
            </Box>
          </Box>
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
            color: "rgba(145, 70, 216, 1)",
            fontSize: "calc(1.2em + 1vw)",
            marginBottom: "2vh",
          }}
        >
          YOUR NEWS FEED
        </Typography>
        <FeedItem
          message="Sudhakar, Wong win Men’s Doubles at the Atlanta Invitational"
          date="9/12/2022"
          author="Jason Lattimore"
        />
        <FeedItem
          message="Sudhakar, Wong win Men’s Doubles at the Atlanta Invitational"
          date="9/12/2022"
          author="Jason Lattimore"
        />
        <FeedItem
          message="Sudhakar, Wong win Men’s Doubles at the Atlanta Invitational"
          date="9/12/2022"
          author="Jason Lattimore"
        />
      </Box>
    </Box>
  );
};
