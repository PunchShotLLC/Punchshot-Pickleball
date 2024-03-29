import logo from "../../assets/images/logo.svg";
import { styled } from "@mui/system";
import "./header.css";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import login from "../../assets/images/login.svg";
import search from "../../assets/images/search.svg";
import shop from "../../assets/images/shop.svg";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../UserContext/usercontext";
import { Link } from 'react-router-dom';

function homeRedirect() {
  window.location.href = "/";
}

const StyledHeader = styled("header")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100vw",
  height: "22.31vh"
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

export const Header = (props) => {
  const [cookies, removeCookie] = useCookies([]);
  const { loading, user } = useContext(UserContext);
  const handleUser = () => {
    if (user) {
      window.location.href = "/account";
    } else {
      console.log(props);
      props.setRender((oldRender) => !oldRender);
    }
  };

  return (
    <StyledHeader>
      <Box sx={{ display: "flex", alignItems: "Center", marginLeft: "1%" }}>
        <img className="logo_image" src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          ml: "auto",
          mr: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          minWidth: "44.9%",
          width: "60%",
          height: "60%",
          //alignItems: "center"
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
          spacing="4%"
          sx={{
            mt: "3.333%",
            position: "relative",
            width: "100%",
            height: "auto",
            //alignSelf: "baseline",
          }}
        >
          <Button
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
            component={Link}
            to={"/"}
          >
            HOME
          </Button>
          <Button
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
            component={Link}
            to={"/about"}
          >
            ABOUT
          </Button>
          <Button
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
            component={Link}
            to={"/what"}
          >
            PICKLEBALL?
          </Button>
          <Button
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
            disabled={!user}
            component={Link}
            to={"/matches"}
          >
            MATCHES
          </Button>
          <Button
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
            disabled={!user}
            component={Link}
            to={"/leaderboard"}
          >
            LEADERBOARD
          </Button>
          <Button
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
            disabled={!user}
            component={Link}
            to={"/leagues"}
          >
            LEAGUES
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          width: "fit-content",
          height: "60%",
          justifyContent: "space-between",
          marginRight: "1%"
        }}
      >
        <Button
          onClick={handleUser}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "fit-content%",
            justifyContent: "flex-end"
          }}
        >
          <Box
            sx={{
              whiteSpace: "nowrap",
              color: "black",
              fontSize: "calc(0.1em + 1vw)",
            }}
          >
            {user ? "PROFILE" : "LOGIN/SIGNUP"}
          </Box>
          <img className="icon_image" src={login} />
        </Button>
      </Box>
    </StyledHeader>
  );
};
