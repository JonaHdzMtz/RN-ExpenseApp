import { createContext, useState } from "react";

const CreateContext = createContext();

export const ContexProvider = ({ children }) => {
    const [expenseList, setExpenseList] = useState([]);

    return (
        <CreateContext.Provider
            value={{
                expenseList,
                setExpenseList
            }}>
            {children}
        </CreateContext.Provider>
    )

}