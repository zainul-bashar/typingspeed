import React from "react";
import { themeOptions } from "../utils/themeOptions";
import Select from "react-select";
import { useTheme } from "../context/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {

    const {setTheme,theme} = useTheme();

    const handleChange = (e) => {

        setTheme(e.value)
        localStorage.setItem('theme',JSON.stringify(e.value))
    }

    return(
        <div className="footer">
           <div className="link">
            <a href='https://github.com/zainul-bashar'>
             <GitHubIcon fontSize="large"/>
             </a>
             <a href="https://www.linkedin.com/in/zainul-bashar-0498a5238/">
                <LinkedInIcon fontSize="large"/>
             </a>
           
    
           </div>
           <div className="theme">
           <Select
             onChange={handleChange}
             options={themeOptions}
             menuPlacement="top"
             defaultValue={{label: theme.label,value: theme}}
             styles={{
                control: styles =>({...styles,backgroundColor: theme.background}),
                menu: styles =>({...styles,backgroundColor: theme.background}),
                option: (styles,{isFocused}) =>{
                    return {
                        ...styles,
                        backgroundColor: (!isFocused) ? theme.background : theme.textColor,
                        color: (!isFocused) ? theme.textColor : theme.background,
                        cursor: 'pointer'
                    }
                }
             }
             }
      />
           </div>
        </div>
    )
}
export default Footer;