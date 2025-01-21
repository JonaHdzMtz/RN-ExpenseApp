import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export const CreateContext = createContext();

export const ContextProvider = ({ children }) => {
    console.log("ContexProvider");
    const [expenseList, setExpenseList] = useState([]);
    const theme = useColorScheme();
    


    return (
        <CreateContext.Provider
            value={{
                expenseList,
                setExpenseList,
                theme
            }}>
            {children}
        </CreateContext.Provider>
    )

}