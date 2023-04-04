import { Header } from "../../components/header/header.js";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import * as React from 'react';
import Typography from "@mui/material/Typography";
import { FeedItem } from "../../components/FeedItem/feedItem.js";
import { ListFeedComponent } from './ListFeedComponent.js';
import '../Upcoming/upcoming.scss'
import "@fontsource/inter";
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import CustomizedInputs from "../tournaments/CustomizedInputs.js";


export const Upcoming = () => {
    return (
        <Box sx={{width: '85vw', height: '77.69vh', display: 'flex'}}>
            <Box sx={{ position: "relative", width: '100%', height: '100%', display: "flex", flexDirection: "column"}}>
                <Typography className="titleText" sx={{ display: "flex", fontSize: 'calc(0.7em + 1vw)', fontWeight: 'bold', pt: '1%'}}>
                    UPCOMING EVENTS
                </Typography>
                <Box className='searchBox' sx={{ display: "flex", flexDirection: "column", position: "relative", width: '50vw' }}>
                    <Typography sx={{ display: "flex", fontSize: 'calc(0.17em + 1vw)', pl: '2.2%'}}>
                        Find Events Near Me
                    </Typography>
                    <CustomizedInputs />
                </Box>
                <Box className='listFeed' sx={{height: '54vh', width:'60vw', borderLeft:'2px solid rgba(145, 70, 216, 1)', display:"flex", flexDirection:"column", alignItems:"center", pt: '2vh', mt: '1.7%'}}>
                    <ListFeedComponent eventTitle='Atlanta Pickleball Classic' eventTypes='Mens singles, Mens doubles, Womens singles, Womens doubles, Mixed doubles' cost='Free' dates='11/22-11/24' />
                    <ListFeedComponent eventTitle='Atlanta Pickleball Classic' eventTypes='Mens singles, Mens doubles, Womens singles, Womens doubles, Mixed doubles' cost='Free' dates='11/22-11/24' />
                    <ListFeedComponent eventTitle='Atlanta Pickleball Classic' eventTypes='Mens singles, Mens doubles, Womens singles, Womens doubles, Mixed doubles' cost='Free' dates='11/22-11/24' />
                </Box>
            </Box>
        </Box>
    );
}