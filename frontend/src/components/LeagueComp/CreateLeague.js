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
    key: "",
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

      setLeagueCenterCoords({ lat: lat , lng: lng })
    })
    .catch(console.error);
  }

  const createLeague = async () => {
    if (
      leagueName === null ||
      numTeams === null ||
      city === null ||
      zipCode === null ||
      startDate === null ||
      leagueDivision === null ||
      leagueSkillLevel === null
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
      LeagueOwner: "ADMIN_PUNCHSHOT", // store admin details in file
      LeagueOwnerEmail: "vigneshsreedhar2002@gmail.com", // store admin details in file
      StartDate: startDate,
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
    updateMapWithAddress("peters parking deck")
  }, []);

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
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%", overflow: "auto" }}>
          <img
            className=".login_x_button"
            style={{ marginTop: "1vw", marginRight: "1vw" }}
            src={x_button}
            onClick={onClose}
          ></img>
        </Box>
        <img height="20%" width="auto" src={logo}></img>
        <MapWithCircle center={leagueCenterCoords} radius={leagueRadius}/>
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
              Maximum Number of Teams <span style={{ color: "red" }}>*</span>
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
              Zip Codes (Enter zipcodes seperated by a comma)
              <span style={{ color: "red" }}>*</span>
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
            display: "inline-block",
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

          <Box
            sx={{
              // width: "65vw",
              display: "inline-block",
              textAlign: "center",
              justifyContent: "space-between",
              marginTop: "2vh",
            }}
          >
            <FormControl
              sx={{ height: "10vw", marginLeft: "10vw" }}
              size="small"
            >
              <StyledLabel htmlFor="skillLevel">
                Skill Level <span style={{ color: "red" }}>*</span>
              </StyledLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leagueSkillLevel}
                label="Age"
                onChange={(event) => setLeagueSkillLevel(event.target.value)}
              >
                <MenuItem value={"Novice"}>Novice</MenuItem>
                <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                <MenuItem value={"Advanced"}>Advanced</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              sx={{ height: "10vw", marginLeft: "2vw" }}
              size="small"
            >
              <StyledLabel htmlFor="skillLevel">
                Division <span style={{ color: "red" }}>*</span>
              </StyledLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leagueDivision}
                label="Age"
                onChange={(event) => setLeagueDivision(event.target.value)}
              >
                <MenuItem value={"Men"}>Men</MenuItem>
                <MenuItem value={"Women"}>Women</MenuItem>
                <MenuItem value={"Mixed"}>Mixed</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
