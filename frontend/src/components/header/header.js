import logo from '../../assets/images/logo.svg'
import { styled } from '@mui/system'
import './header.scss'
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import login from '../../assets/images/login.svg'
import search from '../../assets/images/search.svg'
import shop from '../../assets/images/shop.svg'
import Button from '@mui/material/Button';

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
//Screen is 1728 by 898 px
>>>>>>> main

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
                    sx={{mt: '3.333%', position: 'relative'}}
                >
                    <Button variant="text">HOME</Button>
                    <Box>ABOUT</Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box>WHAT IS PICKLEBALL?</Box>
                    </Box>
                    <Box>PLAY</Box>
                    <Box>TOURNAMENTS</Box>
                </Stack>
            </Box>
            <Box sx={{alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', width: 'fit-content', top: '10.79%', right: '1.458%', position: 'relative'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content%', justifyContent: 'flex-end'}}>
                    <Box sx={{whiteSpace: 'nowrap'}}>LOGIN/SIGN UP</Box>
                    <img className='icon_image'src={login} />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content%', justifyContent: 'flex-end', pt: '16.5%'}}>
                    <Box sx={{whiteSpace: 'nowrap'}}>SEARCH</Box>
                    <img className='icon_image'src={search} />
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content%', justifyContent: 'flex-end', pt: '16.5%'}}>
                    <Box sx={{whiteSpace: 'nowrap'}}>SHOP</Box>
                    <img className='icon_image'src={shop} />
                </Box>
            </Box>
        </StyledHeader>
    )
}