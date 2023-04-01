import { Header } from "../../components/Header/header.js";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import * as React from 'react';
import { useState } from "react";
import Tabs from '../../components/Tabs/Tabs.js'
import { alpha } from '@mui/material/styles';
import General from "../../pages/Settings/general.js";
import Privacy from "../../pages/Settings/privacy.js";
import Blocking from "../../pages/Settings/blocking.js";
import Other from "../../pages/Settings/other.js";
import Location from"../../pages/Settings/location.js";


export const TabBox = () => {

    function CallBack(childData) {
        setValue(childData);
        console.log('from the child componeent', childData);
    }
    const color = '#9146D8'
    const [tabs] = useState([
    {name: 'General', id:0, comp: General},
    {name: 'Privacy & Security', id:1, comp: Privacy},
    {name: 'Blocking', id:2, comp: Blocking},
    {name: 'Location & Region', id:3, comp: Location},
    {name: 'Other', id:4, comp: Other},
  ])
    const [value, setValue] = React.useState(0);

    return (
        <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        paddingRight="3em"
        paddingLeft = "3em"
        width="78%">
                <Tabs data={tabs} color = {color} handleCallback={CallBack}/>

            <Box 
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
        >
            <Box
        sx={{
            width: "100%",
            paddingLeft: "1em",
            paddingRight: "1em",
            borderRadius: 4,
            backgroundColor: '#ffffff',
            border: `3px solid ${color}`,
            transition: '.4s',
            height:'35em',
            '&:hover': {
                boxShadow: `${alpha(color, 0.25)} 0 0 0 0.2rem`,
                transition: '.4s',
            },
        }} 
            >   {tabs.map((tab) => (
                value === tab.id && <tab.comp/>
                    // <tab.componentName/>
            ))} 
            
                {/* {value === 0 && <General/>}
                {value === 1 && <Privacy />}
                {value === 2 && <Blocking />}
                {value === 3 && <Location />}
                {value === 4 && <Other/>} */}
         
            </Box>    
            </Box> 
        </Box>
    );
}