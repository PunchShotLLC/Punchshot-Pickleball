import { Header } from "../../components/header/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { requirePropFactory } from "@mui/material";
import home from "../../assets/images/home.svg";
import { styled } from "@mui/system";
import "./home.css";
import { Login } from "../../components/login/login.js";
import React, { useState } from "react";

export const Home = () => {
  const [renderLoginPopup, setRenderLoginPopup] = React.useState(false);

  return (
    <Box>
      <Login render={renderLoginPopup} setRender={setRenderLoginPopup} />
      <Header setRender={setRenderLoginPopup} />
      <Box sx={{ display: "flex", width: "100vw", height: "53vh" }}>
        <Box sx={{ width: "100vw", height: "53vh", display: "flex" }}>
          <Box
            sx={{
              backgroundImage: `url(${home})`,
              backgroundSize: "cover",
              height: "100%",
              width: "77vw",
            }}
          ></Box>
          <Box
            sx={{
              width: "33vw",
              height: "53vh",
              backgroundColor: "#9146D8",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontFamily: "Inter",
                fontSize: "calc(1.4em + 1vw)",
                fontWeight: "bold",
                textAlign: "left",
                width: "90%",
              }}
            >
              REGISTRATION FOR THE ATLANTA TOURNAMENT CLOSES 11/15
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "Inter",
                fontSize: "calc(0.03em + 1vw)",
                textAlign: "left",
                width: "90%",
              }}
            >
              The latest Atlanta Pickleball tournament, hosted by the Greater
              Atlanta Pickleball League, closes registration in 48 hours! Be
              sure to get your registration in before the deadline to secure a
              spot, and receive a complimentary T-shirt!{" "}
            </Typography>
            <Button
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "0px",
                fontSize: "calc(0.4em + 1vw)",
                paddingLeft: "5%",
                paddingRight: "5%",
                alignSelf: "flex-end",
                marginTop: "4vh",
                marginRight: "5%",
                "&:hover": { backgroundColor: "darkgray" },
              }}
            >
              REGISTER
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", height: "24.69vh" }}>
        <Box sx={{ backgroundColor: "black", width: "40%" }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "Inter",
              fontSize: "calc(1.5em + 1vw)",
              textAlign: "left",
              fontWeight: "Bold",
              paddingLeft: "5%",
              paddingTop: "2%",
            }}
          >
            WANT TO
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "Inter",
              fontSize: "calc(1.5em + 1vw)",
              textAlign: "left",
              fontWeight: "Bold",
              paddingLeft: "5%",
            }}
          >
            LEARN MORE?
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{
              width: "100%",
              marginTop: "10%",
              position: "relative",
              bottom: "15%",
            }}
          >
            <Button
              sx={{
                color: "white",
                background: "linear-gradient(black 50%, #9146D8 50%)",
                borderRadius: "0px",
                padding: "0px",
                fontSize: "calc(0.4em + 1vw)",
                "&:hover": {
                  background: "linear-gradient(black 50%, #B989E6 50%)",
                },
              }}
            >
              WHAT IS PICKLEBALL?
            </Button>
            <Button
              sx={{
                color: "white",
                background: "linear-gradient(black 50%, #9146D8 50%)",
                borderRadius: "0px",
                padding: "0px",
                fontSize: "calc(0.4em + 1vw)",
                "&:hover": {
                  background: "linear-gradient(black 50%, #B989E6 50%)",
                },
              }}
            >
              SIGN UP
            </Button>
            <Button
              sx={{
                color: "white",
                background: "linear-gradient(black 50%, #9146D8 50%)",
                borderRadius: "0px",
                padding: "0px",
                fontSize: "calc(0.4em + 1vw)",
                "&:hover": {
                  background: "linear-gradient(black 50%, #B989E6 50%)",
                },
              }}
            >
              SHOP
            </Button>
          </Stack>
        </Box>
        <Box sx={{ width: "40%", paddingLeft: "2%", paddingTop: "1.5vh" }}>
          <Typography
            sx={{
              color: "#9146D8",
              fontSize: "calc(1em + 1vw)",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            FIND TOURNAMENTS
          </Typography>
          <Typography
            sx={{ textAlign: "left", fontSize: "calc(0.03em + 1vw)" }}
          >
            Cheer on those who are competing, or level up your game and register
            for an official tournament near you! Find out more information from
            official league calendars to compete in several divisions of
            Pickleball.{" "}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "1vh" }}
          >
            <Button
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "0px",
                fontSize: "calc(0.25em + 1vw)",
                marginTop: "2%",
                padding: "0% 5%",
                "&:hover": { backgroundColor: "darkgray" },
              }}
            >
              SEE ALL TOURNAMENTS
            </Button>
            <Button
              sx={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "0px",
                fontSize: "calc(0.25em + 1vw)",
                marginTop: "2%",
                padding: "0% 5%",
                "&:hover": { backgroundColor: "darkgray" },
              }}
            >
              FIND NEAR ME
            </Button>
          </Stack>
        </Box>
        <Box sx={{ width: "30%", paddingTop: "1.5vh" }}>
          <Typography
            sx={{
              fontSize: "calc(1em + 1vw)",
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            UPCOMING EVENTS
          </Typography>
          <Box
            sx={{
              borderRight: "0.2em solid #9146D8",
              marginRight: "1%",
              paddingRight: "2%",
            }}
          >
            <Typography
              sx={{ textAlign: "right", fontSize: "calc(0.03em + 1vw)" }}
            >
              Georgia Tech Open ($10K)
            </Typography>
            <Typography
              sx={{ textAlign: "right", fontSize: "calc(0.03em + 1vw)" }}
            >
              Nov. 10 - Nov. 12
            </Typography>
            <Typography
              sx={{ textAlign: "right", fontSize: "calc(0.03em + 1vw)" }}
            >
              Atlanta, GA
            </Typography>
          </Box>
          <Box
            sx={{
              borderRight: "0.2em solid #9146D8",
              marginRight: "1%",
              borderRight: "0.2em solid #D5FD51",
              paddingRight: "2%",
              marginTop: "2%",
            }}
          >
            <Typography
              sx={{ textAlign: "right", fontSize: "calc(0.03em + 1vw)" }}
            >
              PickleShot Open ($5K)
            </Typography>
            <Typography
              sx={{ textAlign: "right", fontSize: "calc(0.03em + 1vw)" }}
            >
              Nov. 22 - Nov. 24
            </Typography>
            <Typography
              sx={{ textAlign: "right", fontSize: "calc(0.03em + 1vw)" }}
            >
              Hilton Head, SC{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
