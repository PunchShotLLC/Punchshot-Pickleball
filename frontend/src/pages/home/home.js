import { Header }  from '../../components/Header/header.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { requirePropFactory } from '@mui/material';
import home from '../../assets/images/home.svg';

export const Home = () => {

    return (
        <Box>
            <Header />
            <Box sx={{ display: 'flex', width: '100vw', height: '53vh', border: '1px solid black'}}>
                <Box sx={{ width: '100vw', height: '53vh', display: 'flex'}}>
                    <img src={home} alt='homeImage' height='100%' width='auto'/>
                    <Box sx={{ width: '30vw', height: '53vh', backgroundColor: '#9146D8'}}>
                        <Typography sx={{color:'white', fontFamily:'Inter', fontSize:'3em', fontWeight:'bold'}}>REGISTRATION FOR THE ATLANTA TOURNAMENT CLOSES 11/15</Typography>
                        <Typography sx={{color:'white'}}>The latest Atlanta Pickleball tournament, hosted by the Greater Atlanta Pickleball League, closes registration in 48 hours! Be sure to get your registration in before the deadline to secure a spot, and receive a complimentary T-shirt!  </Typography>
                        <Button sx={{color:'white', backgroundColor:'black', borderRadius:'0px'}}>REGISTER</Button>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', height: '27.5vh'}} >
                <Box sx={{backgroundColor: "black", width: '37.9vw'}}>
                    <Typography sx={{color: 'white'}}>WANT TO LEARN MORE?</Typography>
                    <Stack direction="row" justifyContent="center" spacing={2} sx={{width: '100%'}}>
                        <Button sx={{color: 'white', background:'linear-gradient(black 50%, #9146D8 50%)', borderRadius:'0px', padding:'0px'}}>WHAT IS PICKLEBALL?</Button>
                        <Button sx={{color: 'white', background:'linear-gradient(black 50%, #9146D8 50%)', borderRadius:'0px', padding:'0px'}}>SIGN UP</Button>
                        <Button sx={{color: 'white', background:'linear-gradient(black 50%, #9146D8 50%)', borderRadius:'0px', padding:'0px'}}>SHOP</Button>
                    </Stack>
                </Box>
                <Box>
                    <Typography sx={{color:'#9146D8'}}>FIND TOURNAMENTS</Typography>
                    <Typography>Cheer on those who are competing, or level up your game and register for an official tournament near you! Find out more information from official league calendars to compete in several divisions of Pickleball. </Typography>
                    <Button sx={{color:'white', backgroundColor:'black', borderRadius:'0px'}}>SEE ALL TOURNAMENTS</Button>
                    <Button sx={{color:'white', backgroundColor:'black', borderRadius:'0px'}}>FIND NEAR ME</Button>
                </Box>
                <Box>
                    <Typography>UPCOMING EVENTS</Typography>
                    <Typography>Georgia Tech Open ($10K)</Typography>
                    <Typography>Nov. 10 - Nov. 12</Typography>
                    <Typography>Atlanta, GA</Typography>
                    <Typography>PickleShot Open ($5K)</Typography>
                    <Typography>Nov. 22 - Nov. 24</Typography>
                    <Typography>Hilton Head, SC </Typography>
                </Box>
            </Box>
        </Box>
    )
}