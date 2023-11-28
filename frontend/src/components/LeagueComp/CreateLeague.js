import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import logo from "../../assets/images/logo.svg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/InputBase";
import x_button from "../../assets/images/x_button.svg";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import defaultImage from "../../pages/Profile/default.png";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const StyledInput = styled(TextField)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  width: "30vw",
  paddingLeft: "1vw",
});

const buttonTheme = createTheme({
    palette: {
      primary: {
        main: "#9146D8",
      },
      secondary: {
        main: "#D9D9D9",
      },
    },
  });

const StyledSelect = styled(Select)({
  borderRadius: "1em",
  border: "3px solid #000000",
  fontSize: "calc(0.8vw + 0.1em)",
  height: "5h",
  width: "30vw",
  paddingLeft: "1vw",
  bottom: "1em",
});

const StyledLabel = styled("label")({
  paddingLeft: "1vw",
  marginBottom: "0.5vh",
});

export const CreateLeague = ({show, onClose}) => {
    const [leagueName, setLeagueName] = useState(null);
    const [numTeams, setNumTeams] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [city, setCity] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [leagues, setLeagues] = useState(null);

    const createLeague = async () => {

        if (
            leagueName === null ||
            numTeams === null ||
            city === null ||
            zipCode === null ||
            startDate === null
          ) {
            alert("All fields are required!");
            return;
          }
         
        // Put the parameters in the request body
        console.log(zipCode); 
        const body = {
          LeagueName: leagueName,
          NumTeams: numTeams,
          ZipCodes: zipCode
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e),
          City: city,
          LeagueOwner: "tempOwner",
          LeagueOwnerEmail: "tiberius.colina@gmail.com", // change in production,
          StartDate: startDate,
          Status: "PENDING",
        };
    
        console.log(body);

        const resp = await axios.post(
          "http://localhost:8000/leagues/createLeague", 
          body
        ); 
    
        if (resp.data.error) {
          alert(resp.data.error);
        } else {
          // alert(content.error);
        }
      };
    
  if(!show){
    return null; 
  }

  return (
    <Box
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          width: "80vw",
          height: "70vh",
          background: "white",
          borderRadius: "calc(0.1em + 1vw)",
          border: "1px solid black",
          zIndex: "5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <img
            className=".login_x_button"
            style={{ marginTop: "1vw", marginRight: "1vw" }}
            src={x_button}
            onClick={onClose}
          ></img>
        </Box>
        <img height="20%" width="auto" src={logo}></img>
        <Box
          sx={{
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
            <StyledLabel htmlFor="email">
              League Name<span style={{ color: "red" }}>*</span>
            </StyledLabel>
            <StyledInput
                  onChange={(event) => setLeagueName(event.target.value)}
                  id="leagueName"
                  placeholder="Atlanta Classic League"
                  required
                />
          </FormControl>
          <FormControl sx={{ height: "5vw", marginLeft: "1.5vw" }}>
                <StyledLabel htmlFor="nbCompetitors">
                  Maximum Number of Teams{" "}
                  <span style={{ color: "red" }}>*</span>
                </StyledLabel>
                <StyledInput
                  onChange={(event) => setNumTeams(event.target.value)}
                  id="nbCompetitors"
                  placeholder="5"
                  required
                />
              </FormControl>
        </Box>
        <Box
          sx={{
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
                <StyledLabel htmlFor="zipCode">
                  Zip Codes (Enter zipcodes seperated by a comma)<span style={{ color: "red" }}>*</span>
                </StyledLabel>
                <StyledInput
                  onChange={(event) => setZipCode(event.target.value)}
                  id="zipCode"
                  placeholder="30332, 02038"
                  required
                />
              </FormControl>
              <FormControl sx={{ height: "5vw", marginLeft: "1.5vw" }}>
                <StyledLabel htmlFor="city">
                  City <span style={{ color: "red" }}>*</span>
                </StyledLabel>
                <StyledInput
                  onChange={(event) => setCity(event.target.value)}
                  id="city"
                  placeholder="Atlanta"
                  required
                />
              </FormControl>
        </Box>
        <Box
          sx={{
            width: "65vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2vh",
          }}
        >
          <FormControl sx={{ width: "30vw" }}>
                <StyledLabel htmlFor="date">
                  Start Date <span style={{ color: "red" }}>*</span>
                </StyledLabel>
                <StyledInput
                  type="date"
                  onChange={(event) => {
                    setStartDate(
                      new Date(
                        event.target.value.split("-")[0],
                        event.target.value.split("-")[1] - 1,
                        event.target.value.split("-")[2]
                      )
                    );
                  }}
                  id="date"
                  required
                />
              </FormControl>
             
        </Box>
        
          
          
        {/* <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="bio">Bio</StyledLabel>
                        <StyledInput multiline rows={4} sx={{width: "65vw"}} id="bio" placeholder="John Doe is an avid pickleball athlete, competing in open tournaments in the greater Atlanta area since 2013. His favorite place to play is in his hometown, Portland. He’s looking forward to competing against you!  " />
                    </FormControl>
                </Box> */}
        <Box sx={{ display: "flex", height: "10vh" }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              height: "50%",
              alignSelf: "flex-end",
              borderRadius: "1em",
            }}
            color="secondary"
            onClick={createLeague}
          >
            Create League
          </Button>
        </Box>
        {/* <Box height="10vh" sx={{display:"flex"}}>
                    <img src={defaultImage} width="auto" height="100%" style={{borderRadius:"50%", border:"3px solid #000000"}}/>
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"flex-end", marginLeft:"1vw"}}>
                        <StyledLabel htmlFor="file">Profile Photo</StyledLabel>
                        <Button component="label" variant="contained" sx={{height:"50%", backgroundColor:"black", borderRadius: '1em'}}>
                            Select Photo
                            <input type="file" accept="image/*" hidden id="file" />
                        </Button>
                    </Box>
                </Box> */}
      </form>
    </Box>
  );
};