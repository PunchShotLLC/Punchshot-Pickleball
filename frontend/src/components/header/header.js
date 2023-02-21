import logo from '../../assets/images/logo.svg'
import { styled } from '@mui/system'
import './header.scss'
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

const StyledHeader = styled('header')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',

    // backgroundColor: 'gray',

    width: '100vw',
    height: '22.31vh',
    
})

const StyledTitle = styled('header')({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',

    fontWeight: '700',
    fontSize: '3em',
    lineHeigth: '4.8125em',

    background: 'linear-gradient(90.41deg, #9146D8 0%, #D5FD51 99.85%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    backgroundBlendMode: 'darken'
})

//Height is 241px Width is 1080 px
//Assumption: screen is 1728 by 898 px

export default function Header() {
    return (
        <StyledHeader>
            <img className='logo_image' src={logo} alt='logo'/>
            <Box sx={{
                ml: 'auto', 
                mr: 'auto', 
                display: 'flex', 
                flexDirection: 'column', 
                minWidth: '44.9%', 
                position: 'relative', 
                top: '19.09%'}}
            >
                <StyledTitle>PUNCHSHOT PICKLEBALL</StyledTitle>
                <Stack 
                    direction='row' 
                    divider={<Divider orientation="vertical" flexItem sx={{border: '0.08em solid #9146D8'}}/>}
                    spacing='5.5%'
                    sx={{mt: '3.333%'}} //figure out why 'top' does not work for this
                >
                    <Box>HOME</Box>
                    <Box>ABOUT</Box>
                    <Box>WHAT IS PICKLEBALL?</Box>
                    <Box>PLAY</Box>
                    <Box>TOURNAMENTS</Box>
                </Stack>
            </Box>

        </StyledHeader>
    )
}