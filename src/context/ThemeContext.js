import { createContext, useState, useContext} from "react";
import { themeOptions } from "../utils/themeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const defaultTheme = JSON.parse(localStorage.getItem('theme'));
    const[theme, setTheme] = useState(defaultTheme || themeOptions[0].value)

    const values = {
        theme,
        setTheme
    }

    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}
export const useTheme = () => useContext(ThemeContext)