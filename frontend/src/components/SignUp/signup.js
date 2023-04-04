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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import defaultImage from '../../pages/Profile/default.png';

const StyledInput = styled(TextField)({
    borderRadius: '1em',
    border: '3px solid #000000',
    fontSize: 'calc(0.8vw + 0.1em)',
    width: "30vw",
    paddingLeft: "1vw"
});

const StyledSelect = styled(Select)({
    borderRadius: '1em',
    border: '3px solid #000000',
    fontSize: 'calc(0.8vw + 0.1em)',
    height: "5h",
    width: "30vw",
    paddingLeft: "1vw",
    bottom: "1em"
});

const StyledLabel = styled('label')({
    paddingLeft: "1vw",
    marginBottom: "0.5vh",
});

export const SignUp = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickConfirmPassword = () => setConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box style={{width:"100vw", height:"100vh", display:"flex", position:"absolute", justifyContent:"center", alignItems:"center"}}>
            <form style={{ width: '80vw', height: '90vh', background: 'white', borderRadius: 'calc(0.1em + 1vw)', border:"1px solid black", zIndex: '5', display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Box sx={{display:"flex", justifyContent:"end", width:"100%"}}>
                    <img className='.login_x_button' style={{marginTop:"1vw", marginRight:"1vw"}} src={x_button} onClick={() => props.setRender((oldRender) => !oldRender)}></img>
                </Box>
                <img height="20%" width="auto" src={logo}></img>
                <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="email">Email<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="email" placeholder="email@example.com" required />
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="firstname">First Name<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="firstname" placeholder="John" required />
                    </FormControl>
                </Box>
                <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="username">Username<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="username" placeholder="JohnDoe" required />
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="lastname">Last Name<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="lastname" placeholder="Doe" required />
                    </FormControl>
                </Box>
                <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
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
                <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="confirmpassword">Confirm Password<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledInput id="confirmpassword" placeholder="********" required 
                        type={confirmPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {confirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }/>
                    </FormControl>
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="lastname">Skill Level<span style={{color:"red"}}>*</span></StyledLabel>
                        <StyledSelect variant="standard" disableUnderline id="lastname" placeholder='Novice, Intermediate, Advanced' required >
                            <MenuItem key="Novice" value="Novice">Novice</MenuItem>
                            <MenuItem key="Intermediate" value="Intermediate">Intermediate</MenuItem>
                            <MenuItem key="Advanced" value="Advanced">Advanced</MenuItem>
                        </StyledSelect>
                    </FormControl>
                </Box>
                <Box sx={{width:"65vw", display:"flex", justifyContent:"space-between", marginTop:"2vh"}} >
                    <FormControl sx={{width:"30vw"}}>
                        <StyledLabel htmlFor="bio">Bio</StyledLabel>
                        <StyledInput multiline rows={4} sx={{width: "65vw"}} id="bio" placeholder="John Doe is an avid pickleball athlete, competing in open tournaments in the greater Atlanta area since 2013. His favorite place to play is in his hometown, Portland. He’s looking forward to competing against you!  " />
                    </FormControl>
                </Box>
                <Box sx={{display:"flex", justifyContent:"space-between", width:"65vw", height:"auto", marginTop:"2vh"}}>
                    <Box height="10vh" sx={{display:"flex"}}>
                        <img src={defaultImage} width="auto" height="100%" style={{borderRadius:"50%", border:"3px solid #000000"}}/>
                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"flex-end", marginLeft:"1vw"}}>
                            <StyledLabel htmlFor="file">Profile Photo</StyledLabel>
                            <Button component="label" variant="contained" sx={{height:"50%", backgroundColor:"black", borderRadius: '1em'}}>
                                Select Photo
                                <input type="file" accept="image/*" hidden id="file" />
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex", height:"10vh"}}>
                        <Button type="submit" variant='contained' style={{height:"50%", alignSelf:"flex-end", borderRadius: '1em'}} color='secondary'>Create Account</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}