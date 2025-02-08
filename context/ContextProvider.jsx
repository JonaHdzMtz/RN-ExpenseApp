import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import {darkTheme, lightTheme} from "../theme/Theme"
export const CreateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [expenseList, setExpenseList] = useState([]);
    const apparence = useColorScheme();
    const [theme, setTheme] = useState(apparence ==="dark"? darkTheme : lightTheme );

    useEffect(()=>{
        setTheme(apparence ==="dark"? darkTheme : lightTheme )
    },[apparence])
    console.log("thema "+ theme);
    return (
        <CreateContext.Provider
            value={{
                theme,
                expenseList,
                setExpenseList,
                
            }}>
            {children}
        </CreateContext.Provider>
    )

}