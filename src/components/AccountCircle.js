import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useTheme } from "../context/ThemeContext";
import GoogleButton from 'react-google-button';
import {GoogleAuthProvider, signInWithPopup,signInWithRedirect} from 'firebase/auth';
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig";
import errorMapping from "../utils/errorMapping";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {

    const[open,setOpen] = useState(false);
    const[value,setValue] = useState(0);
    const{theme} = useTheme();

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const openModal = () => {
        if(user){
           navigate('/user')
        }
        else{
            setOpen(true);
        }
        
    }
    const closeModal = () => {
        setOpen(false);
    }

    const changeValue = (e,v) => {
        setValue(v);
    }

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignup = () => {
         signInWithPopup(auth,googleProvider).then((res)=>{
            toast.success('user logined with google', {
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

    const logOut = () => {
        auth.signOut().then((res)=>{
            toast.success('user loged out', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                });
        }).catch((err)=>{
            toast.error( 'user not able to logout', {
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

    return (
        <div>
         <AccountCircleIcon onClick = {openModal}/>
          {user && <LogoutIcon onClick={logOut}/>}
         <Modal
          open = {open}
          onClose={closeModal}
          style={{
            display: 'flex',
            alignItems: 'Center',
            justifyContent: 'center'
          }
          }
         >
            <div style={{width: '400px', textAlign: "center"}}>
                <AppBar style={{position: 'static', background: 'transparent'}}>
                    <Tabs variant="fullWidth"
                          value={value}
                          onChange={changeValue}
                    >
                      <Tab label='login' style={{color: theme.textColor}}></Tab>
                      <Tab label='signup' style={{color: theme.textColor}}></Tab>
                    </Tabs>
                </AppBar>
                {value === 0 && <LoginForm closeModal={closeModal}/>}
                {value === 1 && <SignupForm closeModal={closeModal}/>}
                <Box>
                    <span>OR</span>
                    <GoogleButton
                       style={{width: '100%', marginTop: '8px'}}
                       onClick={handleGoogleSignup}
                    />
                </Box>
            </div>
         </Modal>
        </div>
    )
}
export default AccountCircle;