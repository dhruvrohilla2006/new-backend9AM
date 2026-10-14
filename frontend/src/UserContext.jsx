import { createContext, useState } from "react";



export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const [data,setData] = useState({
        name:"",
        age:"",
        class:""
    })
    const [record,setRecord] =useState([])
    return (
        <UserContext.Provider value={{data,setData,record,setRecord}}>
            {children}
        </UserContext.Provider>
    )
}