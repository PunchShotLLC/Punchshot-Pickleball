import { Header }  from '../../components/Header/Header.js';
import Box from '@mui/material/Box';
import { requirePropFactory } from '@mui/material';

export const Home = () => {

    return (
        <Box>
            <Header />
            <Box sx={{ display: 'flex', width: '100vw', height: '30vh', border: '1px solid black'}}>
              
                <img src='./image.jpg' alt='homeImage' width="1273px" height="568px"/>
             
                
            </Box>
        </Box>
        
    )
}