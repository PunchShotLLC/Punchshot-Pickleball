import React from "react";
import Box from '@mui/material/Box';
import { flexbox } from '@mui/system';
import { Divider } from '@mui/material';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { positions } from '@mui/system';
import { sizing } from '@mui/system';
import { grid } from '@mui/system';
import { display } from '@mui/system';
import zIndex from "@mui/material/styles/zIndex";
import { Table } from '@mui/material';
import Rectangle27 from '../../assets/images/Rectangle27.png';


//vh - 800
//vw - 1280


export const Main = () => {
    return (
        <Box sx={{ display:"flex", backgroundColor: 'white', width: '100vw', height: '100vh'}}>
            <Box
              className = "blackBoxLeftDiv"
              sx={{
                mt: '22.29%',
                display: "inline",
                flexDirection: "row",
                backgroundColor: 'black',
                width: '50%',
                height: '77.685%',
                zIndex: 1,
                alignContent: 'leading',
              }}
            >

            </Box>
            <Box
              className = "rightDiv"
              sx={{
                backgroundColor: 'white',
                mt: '22.29%',
                width: '50%',
                height: '77.685%',
                zIndex: 0,
              }}
            >
              <Box
                className = "rightDiv"
                sx={{
                  backgroundColor: '#9146D8',
                  width: '92.84%',
                  height: '89.51%',
                  zIndex: 1,
                  mt: '5.50%',
              }}
              >
              </Box> 
              <image 
                src= {Rectangle27}
                sx={{
                  zIndex: 2,
              }}
              />
            </Box>
        </Box>
    );
}
