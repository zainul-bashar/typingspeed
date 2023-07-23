import React from "react";
import AccountCircle from "./AccountCircle";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import logo from "../image/logo.png"
const Header = () => {
    return (
        <div className="header">
          <div className="logo">
            <img src={logo} style={{width:"4rem",height:"4rem"}}/>
            {/* <SortByAlphaIcon/> */}
          </div>
          <div className="userIcon">
             <AccountCircle/>
          </div>
        </div>
    )
}
export default Header;