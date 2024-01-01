import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { requirePropFactory } from "@mui/material";
import home from "../../assets/images/home.svg";
import { styled } from "@mui/system";
import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext/usercontext";
import "./home.css";

export const Home = () => {
  const { loading, user } = useContext(UserContext);
  const setRenderLoginPopup = useOutletContext();
  const handleUser = () => {
    if (user) {
      window.location.href = "/account";
    } else {
      setRenderLoginPopup((oldRender) => !oldRender);
    }
  };
  return (
    <Box>
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
                marginTop: "4%",
                width: "90%",
                lineHeight: "1.25"
              }}
            >
              REGISTER FOR LEAGUES
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
              Welcome to the ultimate destination for Pickleball enthusiasts! Ready to take your Pickleball game to the next level? Dive into the exhilarating world of competitive play by joining our Pickleball leagues. Whether you're a seasoned pro or a beginner looking to sharpen your skills, our platform is your gateway to thrilling matches, vibrant community engagement, and unforgettable moments on the court.
            </Typography>
            <Button
              href="/leagues"
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
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "black", height: "28vh", justifyContent:"center" }}>
        <Typography
          sx={{
            color: "white",
            fontFamily: "Inter",
            fontSize: "calc(1.5em + 1vw)",
            textAlign: "center",
            fontWeight: "Bold"
          }}
        >
          WANT TO LEARN MORE?
        </Typography>
        {/* <Typography
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
        </Typography> */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "3%",
            position: "relative",
            bottom: "15%",
          }}
        >
          <Button
            href="\about"
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
            ABOUT US
          </Button>
          <Button
            href="\leagues"
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
            LEAGUES
          </Button>
          <Button
            onClick={handleUser}
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
            LOGIN/SIGNUP
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
