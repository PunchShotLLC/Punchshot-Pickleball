import logo from "../../assets/images/logo.svg";
import { styled } from "@mui/system";
import "./header.scss";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import login from "../../assets/images/login.svg";
import search from "../../assets/images/search.svg";
import shop from "../../assets/images/shop.svg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function homeRedirect() {
  window.location.href='/'
}
const StyledHeader = styled("header")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignContent: "flex-start",

  // backgroundColor: 'gray',

  width: "100vw",
  height: "22.31vh",
});

const StyledTitle = styled("header")({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  alignSelf: "center",

  fontWeight: "700",
  fontSize: "calc(2em + 1vw)",
  lineHeigth: "4.8125em",

  background: "linear-gradient(90.41deg, #9146D8 0%, #D5FD51 99.85%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  backgroundBlendMode: "darken",
});

//Height is 241px Width is 1080 px
//Screen is 1728 by 898 px

export const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <img className="logo_image" src={logo} alt="logo"  />       
      </Link>
        <Box
          sx={{
            ml: "auto",
            mr: "auto",
            display: "flex",
            flexDirection: "column",
            minWidth: "44.9%",
            position: "relative",
            top: "19.09%",
          }}
        >
        <StyledTitle onClick={homeRedirect}>PUNCHSHOT PICKLEBALL</StyledTitle>
        <Stack
          direction="row"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ border: "0.08em solid #9146D8" }}
            />
          }
          spacing="5.5%"
          sx={{
            mt: "3.333%",
            position: "relative",
            width: "80vw",
            height: "auto",
          }}
        >
          <Button href="/"
            sx={{
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
              padding: "0px",
              margin: "0px",
              "&:hover": {
                color: "#9146D8",
                fontWeight: "bold",
                backgroundColor: "transparent",
              },
            }}
          >
            HOME
          </Button>
          <Button href="/about"
            sx={{
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
              padding: "0px",
              margin: "0px",
              "&:hover": {
                color: "#9146D8",
                fontWeight: "bold",
                backgroundColor: "transparent",
              },
            }}
          >
            ABOUT
          </Button>
          <Button href="/what"
            sx={{
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
              padding: "0px",
              margin: "0px",
              "&:hover": {
                color: "#9146D8",
                fontWeight: "bold",
                backgroundColor: "transparent",
              },
            }}
          >
            WHAT IS PICKLEBALL?
          </Button>
          <Button href="/play"
            sx={{
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
              padding: "0px",
              margin: "0px",
              "&:hover": {
                color: "#9146D8",
                fontWeight: "bold",
                backgroundColor: "transparent",
              },
            }}
          >
            PLAY
          </Button>
          <Button href="/tournaments"
            sx={{
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
              padding: "0px",
              margin: "0px",
              "&:hover": {
                color: "#9146D8",
                fontWeight: "bold",
                backgroundColor: "transparent",
              },
            }}
          >
            TOURNAMENTS
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
          top: "10.79%",
          right: "1.458%",
          position: "relative",
          justifyContent: "space-around",
        }}
      >
        <Button href="/login"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "fit-content%",
            justifyContent: "flex-end",
          }}
        >
          <Box 
            sx={{
              whiteSpace: "nowrap",
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
            }}
          >
            LOGIN/SIGN UP
          </Box>
          <img className="icon_image" src={login} />
        </Button>
        <Button href="/search"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "fit-content%",
            justifyContent: "flex-end",
            pt: "16.5%",
          }}
        >
          <Box
            sx={{
              whiteSpace: "nowrap",
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
            }}
          >
            SEARCH
          </Box>
          <img className="icon_image" src={search} />
        </Button>
        <Button href="/shop"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "fit-content%",
            justifyContent: "flex-end",
            pt: "16.5%",
          }}
        >
          <Box
            sx={{
              whiteSpace: "nowrap",
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
            }}
          >
            SHOP
          </Box>
          <img className="icon_image" src={shop} />
        </Button>
      </Box>
    </StyledHeader>
  );
};
