import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../utils/errorMapping";

const LoginForm = ({closeModal}) => {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const{theme} = useTheme();
    
    const handleLogin = () => {

             if(!email || !password){
                toast.warning('please enter all the fields', {
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
            auth.signInWithEmailAndPassword(email,password).then((res)=>{
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
            <Button
              variant="contained"
              size="large"
              style={{color: theme.background ,background: theme.textColor}} 
              onClick={handleLogin}
            >Login</Button>
          </Box>
        </div>
    )
}
export default LoginForm;