import React from "react";
import { Header } from "../../components/header/header";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomizedInputs from "./CustomizedInputs";
import { styled } from "@mui/system";
import { Stack } from "@mui/material";
import rectangle31 from "../../assets/images/Rectangle31.png";
import rectangle32 from "../../assets/images/Rectangle32.png";
import rectangle33 from "../../assets/images/Rectangle33.png";
import chevronRight from "../../assets/images/chevronRight.png";

const StyledTitle = styled("header")({
  fontSize: "calc(1em + 1vw)",
  lineHeigth: "4.8125em",
  background: "linear-gradient(90.41deg, #FFFFFF 0%, #D5FD51 99.85%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  backgroundBlendMode: "darken",
});

const StyledParagraph = styled("typography")({
  color: "white",
  fontFamily: "Inter",
  fontSize: "1rem",
  fontWeight: "425",
});
const StyledHeader = styled("typography")({
  color: "white",
  fontFamily: "Inter",
  fontSize: "2.5rem",
  fontWeight: "700",
  display: "block",
  transform: "translate(-15%)",
});
const CustomButton = styled("button")({
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  bottom: 10,
  right: 0,
  height: "10%",
  width: "fit-content%",
  backgroundColor: "transparent",
  border: 0,
  color: "white",
  fontFamily: "Inter",
  fontSize: "1.75rem",
  fontWeight: "600",
  textDecorationLine: "underline",
  textDecorationThickness: "2px",
  textUnderlineOffset: "5px",
  margin: 0,
  cursor: "pointer",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  textAlign: "center",
  "&:hover": {
    color: "#9146D8",
    fontWeight: "bold",
    backgroundColor: "",
  },
});

export const Play = () => {
  return (
    <div>
      <Header />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "77.69vh",
          left: "0px",
          background: "linear-gradient(100.59deg, #9146D8 0%, #000000 100%)",
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
          <StyledTitle>START PLAYING TODAY</StyledTitle>
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
            Find your place in the pickleball community, whether that’s with
            private or public coaching, recreational pickup games, local
            leagues, or step your game up and register for a tournament to win
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
          Narrow the search to your area!
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
          sx={{
            height: "45%",
            paddingTop: 10,
          }}
        >
          <Stack
            height="100%"
            direction="row"
            spacing={{ xs: 3, sm: 6, md: 12 }}
            justifyContent="center"
          >
            <Box
              sx={{
                position: "relative",
                width: "25%",
                height: "100%",
                backgroundColor: "black",
                backgroundSize: "cover",
                backgroundImage: `url(${rectangle31})`,
                paddingLeft: 1,
                paddingTop: 2,
              }}
            >
              <StyledHeader>JOIN A LEAGUE</StyledHeader>
              <StyledParagraph>
                Enjoy consistent matchups and regular pickleball games against
                new friends in your area, based entirely on your skill level and
                availability! Register for a pickleball league as soon as today
                to get involved.
              </StyledParagraph>
              <CustomButton>
                FIND LEAGUES
                <img className="icon_image" src={chevronRight}></img>
              </CustomButton>
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "25%",
                height: "100%",
                backgroundColor: "black",
                backgroundSize: "cover",
                backgroundImage: `url(${rectangle32})`,
                paddingLeft: 1,
                paddingTop: 2,
              }}
            >
              <StyledHeader>FIND COACHING</StyledHeader>
              <StyledParagraph>
                Looking to hone your skills? Find a coach within your area in
                minutes based on your needs, price range, and availability. We
                are here to help you become a better athlete, in the way that
                you want!
              </StyledParagraph>
              <CustomButton>
                BROWSE COACHES
                <img className="icon_image" src={chevronRight}></img>
              </CustomButton>
            </Box>
            <Box
              sx={{
                position: "relative",
                width: "25%",
                height: "100%",
                backgroundColor: "dimgrey",
                backgroundSize: "cover",
                backgroundImage: `url(${rectangle33})`,
                paddingLeft: 1,
                paddingTop: 2,
              }}
            >
              <StyledHeader>TOURNAMENTS</StyledHeader>
              <StyledParagraph>
                Ready to put your skills to the test? Register for an official
                tournament near you today, in your division! Find singles and
                doubles matches for all skill levels. Compete to win prizes set
                by tournament organizers!
              </StyledParagraph>
              <CustomButton>
                REGISTER TODAY
                <img className="icon_image" src={chevronRight}></img>
              </CustomButton>
            </Box>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};
