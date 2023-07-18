import { createContext, useState, useContext} from "react";
import { themeOptions } from "../utils/themeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    console.log("Themeoptions",themeOptions)
    const[theme, setTheme] = useState(themeOptions[0].value)

    const values = {
        theme,
        setTheme
    }
    
    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}
export const useTheme = () => useContext(ThemeContext)