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

        /**
         * fetch("http://localhost:5001/users/login", {
            "headers": {
                "accept": "*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "text/plain;charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "http://localhost:3000/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"Username\":\"testUser\",\"Password\":\"changedPassword\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "omit"
            });
            
            fetch("http://localhost:5001/users/login", {
                "headers": {
                    "accept": "*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "text/plain;charset=UTF-8",
                    "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "Referer": "http://localhost:3000/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "{\"Username\":\"testUser\",\"Password\":\"changedPassword\"}",
                "method": "POST"
                });

                handleLogin @ http://localhost:3000/static/js/bundle.js:2267
                callCallback @ http://localhost:3000/static/js/bundle.js:47205
                invokeGuardedCallbackDev @ http://localhost:3000/static/js/bundle.js:47249
                invokeGuardedCallback @ http://localhost:3000/static/js/bundle.js:47306
                invokeGuardedCallbackAndCatchFirstError @ http://localhost:3000/static/js/bundle.js:47320
                executeDispatch @ http://localhost:3000/static/js/bundle.js:51464
                processDispatchQueueItemsInOrder @ http://localhost:3000/static/js/bundle.js:51490
                processDispatchQueue @ http://localhost:3000/static/js/bundle.js:51501
                dispatchEventsForPlugins @ http://localhost:3000/static/js/bundle.js:51510
                (anonymous) @ http://localhost:3000/static/js/bundle.js:51670
                batchedUpdates$1 @ http://localhost:3000/static/js/bundle.js:66062
                batchedUpdates @ http://localhost:3000/static/js/bundle.js:47053
                dispatchEventForPluginEventSystem @ http://localhost:3000/static/js/bundle.js:51669
                dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay @ http://localhost:3000/static/js/bundle.js:49175
                dispatchEvent @ http://localhost:3000/static/js/bundle.js:49169
                dispatchDiscreteEvent @ http://localhost:3000/static/js/bundle.js:49146

                POST /users/login HTTP/1.1

         */
        try {
            var raw = JSON.stringify({
                "Username": Username,
                "Password": Password
              });
            
            const response = await fetch('http://localhost:5001/users/login', {
                method: 'POST',
                body: raw,
                headers: {
                    'Content-Type': 'application/json'
                  }
            });
            console.log(response)
            const json = await response.json()
            console.log(json)
            console.log("logged in");
        } catch (err) {
            console.log(err.message);
        }

    }
    
    const handleCreate = async (e) => {
        e.preventDefault();
        console.log(Username, Password)
        const response = await fetch('http://localhost:5001/users/add', {
            method: 'POST',
            body: JSON.stringify({ "Username": Username, "Password": Password })
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