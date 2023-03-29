import logo from '../../assets/images/logo.svg'
import './login.scss'
import Typography from "@mui/material/Typography";
import CustomInput from './CustomInput.js'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import x_button from '../../assets/images/x_button.svg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';


const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#9146D8',
        },
        secondary: {
            main: '#D9D9D9',
        }
    }
})

export const Login = (props) => {

    if (props.render == true) {
        return (
            <ThemeProvider theme={buttonTheme}>
                <Box sx={{ width: '31.25vw', height: '31.25vw', background: 'white', borderRadius: 'calc(0.1em + 1vw)', position: 'absolute', left: '34.4vw', top: '22.22vh', zIndex: '5'}}>
                    <img className="login_x_button" src={x_button} onClick={() => props.setRender((oldRender) => !oldRender)}></img>
                    <img className="login_logo_image" src={logo}></img>
                    <Typography align="center" sx={{ position: 'relative', mt: "10%" }}>Log into your account, or sign up here!</Typography>
                    <div className="login_input">
                        <CustomInput text="Username" />
                    </div>
                    <div className="login_input">
                        <CustomInput text="Password" />
                    </div>
                    <div className='login_button_grid'>
                        <Button variant='contained' color='secondary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.8vw)', pr: 'calc(1.8vw)' }}>Create Account</Button>
                        <Button variant='contained' color='primary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(4vw)', pr: 'calc(4vw)' }}>Sign In</Button>
                    </div>
                    <Link color='primary' sx={{position:'relative', top:'3%', left: '37%'}}>Forgot Password?</Link>
                </Box>
                <Box sx={{zIndex:'3', minWidth:'100vw', minHeight:'100vh', backgroundColor:'lightgray', opacity:'0.8', position: 'absolute'}}></Box>
            </ThemeProvider>
        )
    }
}