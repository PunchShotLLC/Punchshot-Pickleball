import React from "react";
import Box from '@mui/material/Box';
import { Header } from '../../components/header/header.js'; 
import { flexbox } from '@mui/system';
import { Divider } from '@mui/material';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { positions } from '@mui/system';
import { sizing } from '@mui/system';
import { grid } from '@mui/system';
import { display } from '@mui/system';
import zIndex from "@mui/material/styles/zIndex";
import { Table } from '@mui/material';
import downArrow from '../../assets/images/image10.png';
import courtPicture from '../../assets/images/Rectangle27.png';
import { ImageList } from '@mui/material';
import scss from '../about/about.scss';
import { Typography } from '@mui/material';
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';



//vh - 800
//vw - 1280


export const About = () => {
    return (
        <Box>
          <Header />
          <Box sx={{ 
            display:"flex", 
            width: '100vw', 
            height: '77.69vh',
            zIndex: "0",
            }}>
            <Box
              className = "blackBoxLeftDiv"
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: 'black',
                width: '50%',
                height: '77.69vh',
                zIndex: 2,
                alignContent: 'leading',
              }}
            >
              <Typography 
              align="left"
              sx={{
                paddingLeft: '4.33%',
                paddingRight: '3.33%',
                paddingTop: '3.33%',
                fontSize: 'calc(1.4em + 1vw)',
                fontWeight: 700,
                fontFamily: "inter",
                zIndex: 4,
                color: "white"
              }}
              >
                MISSION
              </Typography>
              <Typography 
              align="left"
              sx={{
                paddingLeft: '4.33%',
                paddingRight: '26.33%',
                fontSize: 'calc(0.16em + 1vw)',
                fontWeight: 400,
                fontFamily: "inter",
                zIndex: 4,
                color: "white"
              }}
              >
                The mission of the Punchshot Pickleball is to promote 
                the development and growth of pickleball in the greater Atlanta community 
                through coaching, tournaments, leagues, and pickup games. 
              </Typography>
              <Typography 
              align="left"
              sx={{
                paddingLeft: '4.33%',
                paddingRight: '3.33%',
                paddingTop: '6.5vh',
                fontSize: 'calc(1.4em + 1vw)',
                fontWeight: 700,
                fontFamily: "inter",
                zIndex: 4,
                color: "white"
              }}
              >
                ABOUT US
              </Typography>
              <Typography 
              align="left"
              sx={{
                paddingLeft: '4.33%',
                paddingRight: '26.33%',
                fontSize: 'calc(0.16em + 1vw)',
                fontWeight: 400,
                fontFamily: "inter",
                zIndex: 4,
                color: "white",
                marginBottom: 'auto',
              }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                mollit anim id est laborum.
              </Typography>
              <Box
              sx={{
                marginTop: 'auto'
              }}
              >
              <Box 
              sx={{
                position: 'relative',
                display: 'inline-flex',
                flexDirection: "row",
                justifyContent: 'space-between',
                pb: '2.75vh'
              }}
              >
              <img 
              className="downArrow1"
              src={downArrow}
              zIndex= '4'
                />
              <text className="scrollToReadMore"> 
                SCROLL TO READ MORE
              </text>
               <img 
              className="downArrow2"
              src={downArrow}
              zIndex= '4'
                />
                </Box>
              </Box>
            </Box>
            <Box
              className = "rightDiv"
              sx={{
                backgroundColor: 'white',
                width: '50%',
                height: '100%',
                zIndex: 2,
                position: "relative"
              }}
            >
                <Box
                className = "PurpleBox"
                sx={{
                  backgroundColor: '#9146D8',
                  width: '92.84%',
                  height: '89%',
                  zIndex: 3,
                  mt: '7%',
              }}
              >
              </Box> 
              <img 
              className="courtPicture"
              src={courtPicture}
              position='relative'
              width= '99.12%'
              height='90%'
              zIndex='4'
                />
            </Box>
            </Box>
        </Box>
    );
}
