import logo from "../../assets/images/logo.svg";
import { styled } from "@mui/system";
import "./header.scss";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import login from "../../assets/images/login.svg";
import search from "../../assets/images/search.svg";
import shop from "../../assets/images/shop.svg";
import Button from "@mui/material/Button";
import './header.scss'

function homeRedirect() {
  window.location.href='/'
}

const StyledHeader = styled('header')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    width: '100vw',
    height: '22.31vh',
})

const StyledTitle = styled('header')({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',

    fontWeight: '700',
    fontSize: 'calc(2em + 1vw)',
    lineHeigth: '4.8125em',

    background: 'linear-gradient(90.41deg, #9146D8 0%, #D5FD51 99.85%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    backgroundBlendMode: 'darken'
})

export const Header = (props) => {
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
                top: '19.09%',
                alignItems: 'center'}}
            >
                <StyledTitle onClick={homeRedirect}>PUNCHSHOT PICKLEBALL</StyledTitle>
                <Stack 
                    direction='row' 
                    divider={<Divider orientation="vertical" flexItem sx={{border: '0.08em solid #9146D8'}}/>}
                    spacing='4%'
                    sx={{mt: '3.333%', position: 'relative', width: '50vw', height:'auto', alignSelf: 'center'}}
                >
                    <Button href='/' sx={{color:'black', fontSize:'calc(0.1em + 1vw)', padding:'0px', margin:'0px', '&:hover': {color: '#9146D8', fontWeight:'bold', backgroundColor:'transparent'}}}>HOME</Button>
                    <Button href='/about' sx={{color:'black', fontSize:'calc(0.1em + 1vw)', padding:'0px', margin:'0px', '&:hover': {color: '#9146D8', fontWeight:'bold', backgroundColor:'transparent'}}}>ABOUT</Button>
                    <Button href='/what' sx={{color:'black', fontSize:'calc(0.1em + 1vw)', padding:'0px', margin:'0px', '&:hover': {color: '#9146D8', fontWeight:'bold', backgroundColor:'transparent'}}}>WHAT IS PICKLEBALL?</Button>
                    <Button href='/play' sx={{color:'black', fontSize:'calc(0.1em + 1vw)', padding:'0px', margin:'0px', '&:hover': {color: '#9146D8', fontWeight:'bold', backgroundColor:'transparent'}}}>PLAY</Button>
                    <Button href='/tournaments' sx={{color:'black', fontSize:'calc(0.1em + 1vw)', padding:'0px', margin:'0px', '&:hover': {color: '#9146D8', fontWeight:'bold', backgroundColor:'transparent'}}}>TOURNAMENTS</Button>
                    <Button href='/leagues' sx={{color:'black', fontSize:'calc(0.1em + 1vw)', padding:'0px', margin:'0px', '&:hover': {color: '#9146D8', fontWeight:'bold', backgroundColor:'transparent'}}}>LEAGUES</Button>
                </Stack>
            </Box>
            <Box sx={{alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', width: 'fit-content', top: '10.79%', right: '1.458%', position: 'relative', justifyContent:'space-around', height: '19vh'}}>
                <Button onClick={() => props.setRender((oldRender) => !oldRender)} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content%', justifyContent: 'flex-end'}}>
                    <Box sx={{whiteSpace: 'nowrap', color:'black', fontSize:'calc(0.1em + 1vw)'}}>LOGIN/SIGN UP</Box>
                    <img className='icon_image'src={login} />
                </Button>
                <Button sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content%', justifyContent: 'flex-end'}}>
                    <Box sx={{whiteSpace: 'nowrap', color:'black', fontSize:'calc(0.1em + 1vw)'}}>SEARCH</Box>
                    <img className='icon_image'src={search} />
                </Button> 
                <Button sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fit-content%', justifyContent: 'flex-end'}}>
                    <Box sx={{whiteSpace: 'nowrap', color:'black', fontSize:'calc(0.1em + 1vw)'}}>SHOP</Box>
                    <img className='icon_image'src={shop} />
                </Button>
            </Box>
        </StyledHeader>
    )
}
