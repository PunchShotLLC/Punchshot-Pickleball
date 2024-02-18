import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import MapWithCircle from "./MapWithCircle";
import axios from "axios";
import { setDefaults, fromAddress } from "react-geocode";


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


const StyledModal = styled(Modal)({
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 overflowY: "auto",
 margin: "32px",
});


const StyledForm = styled('form')({
 backgroundColor: "white",
 borderRadius: "16px",
 padding: "24px",
 display: "flex",
 flexDirection: "column",
 gap: "16px",
 width: "calc(100% - 64px)",
 maxWidth: "600px",
});


const FormRow = styled('div')({
 display: 'flex',
 justifyContent: 'space-between',
 gap: "16px",
});


const ModalContent = styled(Box)({
 display: 'flex',
 flexDirection: 'column',
 gap: "16px",
});

const RADIUS_TEST = 10000;

export const CreateLeague = ({ show, onClose }) => {
  const [leagueName, setLeagueName] = useState("");
  const [leagueSkillLevel, setLeagueSkillLevel] = useState("");
  const [leagueDivision, setLeagueDivision] = useState("");
  const [startDate, setStartDate] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  // const [endDate, setEndDate] = useState(null);
  // States for location-setting, including coordinates and radius
  const [leagueRadius, setLeagueRadius] = useState(RADIUS_TEST);
  const [leagueCenterCoords, setLeagueCenterCoords] = useState(null);
 
  const [leagues, setLeagues] = useState(null);
 


 // Set up geocode for address -> coord calls
 setDefaults({
  key: "AIzaSyASByHOyayF2D5qfd8Y2muEA6dfRkeK84c",
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
});


/**
 * Centers the map at a particular address.
 * Uses google maps geocode api to receive coordinates from an addresss
 * @param {string} address address of where to center the map
 */
const updateMapWithAddress = (address) => {
  fromAddress(address)
    .then(({ results }) => {
      const { lat, lng } = results[0].geometry.location;
      console.log(lat, lng);


      setLeagueCenterCoords({ lat: lat, lng: lng });
    })
    .catch(console.error);
};




const createLeague = async () => {
  
  // Ensure registration date is at least a week before the league start date
  const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // One week
  if (new Date(startDate) - new Date(registrationDate) < weekInMilliseconds) {
    alert("Team registration date must be at least a week before the league start date.");
    return;
  }
  
  
  if (
    leagueName === null ||
    registrationDate == null ||
    startDate === null ||
    leagueDivision === null ||
    leagueSkillLevel === null
  ) {
    alert("All fields are required!");
    return;
  }


  // Put the parameters in the request body
  const body = {
    LeagueName: leagueName,
    LeagueOwner: "ADMIN_PUNCHSHOT", // store admin details in file
    LeagueOwnerEmail: "vigneshsreedhar2002@gmail.com", // store admin details in file
    StartDate: startDate,
    RegistrationDate: registrationDate,
    Division: leagueDivision,
    SkillLevel: leagueSkillLevel,
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


useEffect(() => {
  updateMapWithAddress("Peter's Parking Deck");
}, []);


if (!show) {
  return null;
}

 return (
   <ThemeProvider theme={buttonTheme}>
     <StyledModal open={show} onClose={onClose}>
       <StyledForm>
         <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
           <CloseIcon />
         </IconButton>
         <Typography variant="h6">Create New League</Typography>
         <FormRow>
           <TextField
             label="League Name"
             value={leagueName}
             onChange={(e) => setLeagueName(e.target.value)}
             fullWidth
           />
           <Select
             value={leagueSkillLevel}
             onChange={(e) => setLeagueSkillLevel(e.target.value)}
             fullWidth
             displayEmpty
           >
             <MenuItem value="" disabled>Skill Level</MenuItem>
             <MenuItem value="Novice">Novice</MenuItem>
             <MenuItem value="Intermediate">Intermediate</MenuItem>
             <MenuItem value="Advanced">Advanced</MenuItem>
           </Select>
         </FormRow>
         <FormRow>
           <TextField
             label="Start Date"
             type="date"
             InputLabelProps={{ shrink: true }}
             value={startDate}
             onChange={(e) => setStartDate(e.target.value)}
             fullWidth
           />
           <TextField
             label="Registration Date"
             type="date"
             InputLabelProps={{ shrink: true }}
             value={registrationDate}
             onChange={(e) => setRegistrationDate(e.target.value)}
             fullWidth
           />
         </FormRow>
         <Select
           value={leagueDivision}
           onChange={(e) => setLeagueDivision(e.target.value)}
           fullWidth
           displayEmpty
         >
           <MenuItem value="" disabled>Division</MenuItem>
           <MenuItem value="Men">Men</MenuItem>
           <MenuItem value="Women">Women</MenuItem>
           <MenuItem value="Mixed">Mixed</MenuItem>
         </Select>
         <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <MapWithCircle center={leagueCenterCoords} radius={leagueRadius} />
         </Box>
         <Button variant="contained" color="primary" onClick={createLeague}>Create League</Button>
       </StyledForm>
     </StyledModal>
   </ThemeProvider>
 );
};
