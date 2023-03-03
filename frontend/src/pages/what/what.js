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

export const What = () => {
    return (
        <Box >
            <Header />
            <Box 
            sx={{
                backgroundColor: 'black',
                display: 'flex',
                width: '100%',
                height: '77.69vh',
                zIndex: '1',
                flexDirection: 'column',
            }}
            >
                <Box
                className = 'TopBlackBox'
                sx={{
                    position: 'relative',
                    zIndex: '2',
                    backgroundColor: 'black',
                    width: '100%',
                    height: '51.19vh',
                }}
                >

                </Box>
                <Box
                className = 'BottomWhiteBox'
                sx={{
                    position: 'relative',
                    zIndex: '2',
                    backgroundColor: 'white',
                    width: '100%',
                    height: '26.5vh',
                }}
                >

                </Box>
            </Box>
        </Box>
    );
}