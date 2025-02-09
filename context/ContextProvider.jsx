import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import {darkTheme, lightTheme} from "../theme/Theme"
import AsyncStorage from "@react-native-async-storage/async-storage";


export const CreateContext = createContext();
export const ContextProvider = ({ children }) => {
    const [expenseList, setExpenseList] = useState([]);
    const apparence = useColorScheme();
    const [theme, setTheme] = useState(apparence ==="dark"? darkTheme : lightTheme );
    const [cardType,setCardType] = useState("boxCard");

    useEffect(()=>{
        setTheme(apparence ==="dark"? darkTheme : lightTheme )
    },[apparence])

    useEffect(()=>{
        AsyncStorage.getItem("cardType").then((value)=>{
            if(value !== null){
                console.log("VVALUE: "+value);
                setCardType(value);
            }
        })
    },[])

    return (
        <CreateContext.Provider
            value={{
                theme,
                expenseList,
                setExpenseList,
                cardType,
                setCardType
            }}>
            {children}
        </CreateContext.Provider>
    )

}