import React from 'react'
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../League/league.scss";
import "@fontsource/inter";
import "@fontsource/inter/200.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import { LeagueComp } from "../../components/LeagueComp/LeagueComp.js";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext/usercontext";
export const AccountLeague = () => {
    const user = useContext(UserContext);
    const leagues = user?.leagues
    const navigate = useNavigate();
    const navigateToLeagueInfo = (teamIndex) => {
        // Navigate to the new page with the data in the route's state
        navigate("/leagueInfo", { state: leagues[teamIndex] });
    };
    return (
        <Box
            sx={{
                width: '80vw',
                height: '77.69vh',
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
            }}
        >
            <Typography
                className="titleText"
                sx={{
                    display: "flex",
                    fontSize: "calc(0.7em + 1vw)",
                    fontWeight: "bold",
                    pt: "1%",
                    marginBottom: '2%'
                }}
            >
                LEAGUES
            </Typography>
            <Typography
                className="bodyText"
                sx={{
                    display: "absolute",
                    fontSize: "calc(0.5em + 1vw)",
                    fontWeight: "bold",
                }}
            ></Typography>
            <Box sx={{ position: "relative", height: "100%", width: "90%" }}>
                {leagues != null
                    ? leagues.map((item, index) => (
                        <LeagueComp
                            logo={require('../../assets/images/ATL1.png')}
                            name={leagues[index]["LeagueName"]}
                            numberOfTeams={leagues[index]["NumTeams"]}
                            teamsSignedUp={leagues[index]["Teams"].length}
                            startDate={leagues[index]["StartDate"]}
                            endDate={leagues[index]["EndDate"]}
                            city={leagues[index]["City"]}
                            onClick={() => {
                                navigateToLeagueInfo(index);
                            }}
                        />
                    ))
                    : null}
                <Box
                    sx={{
                        position: "absolute",
                        top: "102%",
                        left: "9.5%",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                ></Box>
            </Box>
        </Box>
    )
}
