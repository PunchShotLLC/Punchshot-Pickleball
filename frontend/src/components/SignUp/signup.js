import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import logo from '../../assets/images/logo.svg';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from '@mui/material/InputBase';
import x_button from '../../assets/images/x_button.svg';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledInput = styled(TextField)({
    borderRadius: '1em',
    border: '3px solid #000000',
    fontSize: 'calc(0.8vw + 0.1em)',
    width: "30vw",
    paddingLeft: "1vw"
});

const StyledLabel = styled('label')({
    paddingLeft: "1vw"
});

export const SignUp = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box style={{width:"100vw", height:"100vh", display:"flex", position:"absolute", justifyContent:"center", alignItems:"center"}}>
            <form style={{ width: '80vw', height: '80vh', background: 'white', borderRadius: 'calc(0.1em + 1vw)', border:"1px solid black", zIndex: '5', display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Box sx={{display:"flex", justifyContent:"end", width:"100%"}}>
                    <img className='.login_x_button' style={{marginTop:"1vw", marginRight:"1vw"}} src={x_button} onClick={() => props.setRender((oldRender) => !oldRender)}></img>
                </Box>
                <img height="20%" width="auto" src={logo}></img>
                <Box sx={{width:"80vw", display:"flex", justifyContent:"space-around"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="email">Email<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="email" placeholder="email@example.com" required />
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="firstname">First Name<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="firstname" placeholder="John" required />
                    </FormControl>
                </Box>
                <Box sx={{width:"80vw", display:"flex", justifyContent:"space-around"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="username">Username<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="username" placeholder="JohnDoe" required />
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="lastname">Last Name<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="lastname" placeholder="Doe" required />
                    </FormControl>
                </Box>
                <Box sx={{width:"80vw", display:"flex", justifyContent:"space-around"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="password">Password<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="password" placeholder="********" required 
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }/>
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="zipcode">Zip Code<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="zipcode" placeholder="30332" required />
                    </FormControl>
                </Box>
                <Box sx={{width:"80vw", display:"flex", justifyContent:"space-around"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="confirmpassword">Confirm Password<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="confirmpassword" placeholder="********" required 
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }/>
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="lastname">Skill Level<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="lastname" placeholder="Novice, Intermediate, Advanced" required />
                    </FormControl>
                </Box>
                <Button variant='contained' color='secondary'>Create Account</Button>
            </form>
        </Box>
    )
}