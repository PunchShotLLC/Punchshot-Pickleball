import Box from "@mui/material/Box";
import * as React from 'react';
import Tabs from '../../components/Tabs/tabs.js'
import { alpha } from '@mui/material/styles';



export const TabBox = (props) => {

    function CallBack(childData) {
        setValue(childData);
        console.log('from the child componeent', childData);
    }
   
    const [value, setValue] = React.useState(0);

    return (
        <Box
        display="flex"
        flexDirection="column"
        alignItems="left"
        paddingRight="3em"
        paddingLeft = "3em"
        width="78%">
                <Tabs data={props.data} color = {props.color} handleCallback={CallBack}/>

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
            border: `3px solid ${props.color}`,
            transition: '.4s',
            height:'35em',
            '&:hover': {
                boxShadow: `${alpha(props.color, 0.25)} 0 0 0 0.2rem`,
                transition: '.4s',
            },
        }} 
            >   {props.data.map((tab) => (
                value === tab.id && <tab.comp key={tab.id * Math.random}/>
            ))}          
            </Box>    
            </Box> 
        </Box>
    );
}