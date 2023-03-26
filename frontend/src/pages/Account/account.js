import { Header } from "../../components/Header/header.js";
import { Profile } from "../Profile/profile.js";
import { Upcoming } from "../Upcoming/upcoming.js";
import { League } from "../League/league.js";
import { Results } from "../Results/results.js";
import { Friends } from "../Friends/friends.js";
import { Settings } from "../Settings/settings.js";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { requirePropFactory } from "@mui/material";
import home from "../../assets/images/home.svg";
import { styled } from "@mui/system";
import * as React from 'react';

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontFamily: 'Inter',
      fontSize:"calc(0.5em + 1vw)",
      marginTop: "5vh",
      marginLeft: "10%",
      color: "white",
    }),
  );

export const Account = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <Box>
            <Header />
            <Box sx={{display:"flex", height:'77.69vh', width:'100vw'}}>
                <Tabs orientation="vertical" value={value} onChange={handleChange}
           sx={{backgroundColor: "#9146D8", width:"15vw",borderRadius:"0px 20px 0px 0px", height:"77.69vh", "& button.Mui-selected": {backgroundColor:"black", color:"white"}}}>
                    <StyledTab label="PROFILE" />
                    <StyledTab label="UPCOMING" />
                    <StyledTab label="LEAGUE" />
                    <StyledTab label="RESULTS"/>
                    <StyledTab label="FRIENDS" />
                    <StyledTab label="SETTINGS" />
                </Tabs>
                {value === 0 && <Profile />}
                {value === 1 && <Upcoming />}
                {value === 2 && <League />}
                {value === 3 && <Results />}
                {value === 4 && <Friends />}
                {value === 5 && <Settings />}
            </Box>
        </Box>
    );
}