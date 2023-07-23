import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../utils/errorMapping";

const SignupForm = ({closeModal}) => {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmedPassword,setConfirmedPassword] = useState('');
    const{theme} = useTheme();

    const handleSignup = () => {
        if(!email || !password || !confirmedPassword){
            toast.warning( 'please enter all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
            return;
        }
        if(password !== confirmedPassword){
            toast.warning('password mismatch', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
            return;
        }
        auth.createUserWithEmailAndPassword(email,password).then((res)=>{
          toast.success('user logined', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            });
            closeModal();
        }).catch((err)=>{
          console.log(err);
          toast.error(errorMapping[err.code] || 'some error occured', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            });
            
        })
    
    }

    return(
        <div>
          <Box p={3}
              style={{display: 'flex', flexDirection: 'column',gap: '20px'}}
          >
            <TextField
              variant="outlined"
              type="email"
              label="enter email"
              onChange={(e)=>setEmail(e.target.value)}
              InputLabelProps={{
                style: {
                    color: theme.textColor
                }
              }}
              InputProps={{
                style: {
                  color: theme.textColor
                }
              }}
            />
            <TextField 
            variant="outlined"
            type="password"
            label="enter password"
            onChange={(e)=>setPassword(e.target.value)}
            InputLabelProps={{
                style: {
                    color: theme.textColor
                }
              }}
              InputProps={{
                style: {
                  color: theme.textColor
                }
              }}
            />
            <TextField 
            variant="outlined"
            type="password"
            label="enter confirmed password"
            onChange={(e)=>setConfirmedPassword(e.target.value)}
            InputLabelProps={{
                style: {
                    color: theme.textColor
                }
              }}
              InputProps={{
                style: {
                  color: theme.textColor
                }
              }}
            />
            <Button
              variant="contained"
              size="large" 
              style={{color: theme.background ,background: theme.textColor}} 
              onClick={handleSignup}
            >Signup</Button>
          </Box>
        </div>
    )
}
export default SignupForm;