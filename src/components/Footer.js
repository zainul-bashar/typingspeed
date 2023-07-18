import React, { useState } from "react";
import { themeOptions } from "../utils/themeOptions";
import Select from "react-select";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {

    const[value,setValue] = useState({});
    const {setTheme} = useTheme();

    const handleChange = (e) => {
        setValue(e.value)
        setTheme(e.value)
    }

    return(
        <div className="footer">
           <div className="link">
            Link
           </div>
           <div className="theme">
           <Select
             value={value}
             onChange={handleChange}
             options={themeOptions}
             menuPlacement="top"
      />
           </div>
        </div>
    )
}
export default Footer;