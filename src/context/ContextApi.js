import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextApiProvider = ({children}) =>{
    const[testTime, setTestTime] = useState(15);

    const values = {
        testTime,
        setTestTime
    }
    return (<ContextApi.Provider value={values}>{children}</ContextApi.Provider>)
}
export const useContextApi = ()=> useContext(ContextApi);