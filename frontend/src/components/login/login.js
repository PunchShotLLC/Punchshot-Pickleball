import logo from '../../assets/images/logo.svg'
import './login.scss'
import Typography from "@mui/material/Typography";
import CustomInput from './CustomInput.js'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import x_button from '../../assets/images/x_button.svg'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useState } from "react"
// import { useSignup } from "../../hooks/useSignup"
// import { useAuthContext } from '../../hooks/useAuthContext';


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
    // const { dispatch } = useAuthContext()

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    // const {signup, error, isLoading} = useSignup()


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(Username)
        console.log(Password)

        let errorBool = false; 
        let response = null;

        try {
            var raw = JSON.stringify({
                "Username": Username,
                "Password": Password
              });
            
            response = await fetch('http://localhost:5001/users/login', {
                method: 'POST',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                  }
            });

            // console.log(response)
            const json = await response.json();
            console.log(json)

            if (json.error == "Incorrect password") {
                console.log("wrong password");
            } else {
                console.log("logged in");

            }
            
            
        } catch (err) {
            errorBool = true;
            console.log(err.message);
        }


    }
    
    const handleCreate = async (e) => {
        e.preventDefault();
        console.log(Username, Password)

        var raw = JSON.stringify({
            "Username": Username,
            "Password": Password
          });

        const response = await fetch('http://localhost:5001/users/add', {
            method: 'POST',
            body: raw,
            headers: {
                'Content-Type': 'application/json'
              }
        });
        console.log(response)
        const json = await response.json()
        console.log(json)
    }

    if (props.render == true) {
        return (
            <ThemeProvider theme={buttonTheme}>
                <Box sx={{ width: '31.25vw', height: '31.25vw', background: 'white', borderRadius: 'calc(0.1em + 1vw)', position: 'absolute', left: '34.4vw', top: '22.22vh', zIndex: '5'}}>
                    <img className="login_x_button" src={x_button} onClick={() => props.setRender((oldRender) => !oldRender)}></img>
                    <img className="login_logo_image" src={logo}></img>
                    <Typography align="center" sx={{ position: 'relative', mt: "10%" }}>Log into your account, or sign up here!</Typography>
                    <div className="login_input">
                        <CustomInput 
                                text={Username}                               
                                varChange={(e) => setUsername(e.target.value)}
                                />
                    </div>
                    <div className="login_input">
                        <CustomInput 
                                text={Password}
                                varChange={(e) => setPassword(e.target.value)}
                                />
                    </div>
                    <div className='login_button_grid'>
                        <Button onClick={handleCreate} variant='contained' color='secondary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(1.8vw)', pr: 'calc(1.8vw)' }}>Create Account</Button>
                        <Button onClick={handleLogin} variant='contained' color='primary' sx={{ position: 'relative', borderRadius: 'calc(0.1em + 0.5vw)', pl: 'calc(4vw)', pr: 'calc(4vw)' }}>Sign In</Button>
                    </div>
                    <Link color='primary' sx={{position:'relative', top:'3%', left: '37%'}}>Forgot Password?</Link>
                </Box>
                <Box sx={{zIndex:'3', minWidth:'100vw', minHeight:'100vh', backgroundColor:'lightgray', opacity:'0.8', position: 'absolute'}}></Box>
            </ThemeProvider>
        )
    }
}