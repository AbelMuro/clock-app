import React, {createContext, useState} from 'react'

export const Context = createContext();

export default function ShareContext(App){
    return () => {
            const [expandDialog, setExpandDialog] = useState(false);

            const value = {
                expandDialog,
                setExpandDialog
            }

        return(
            <Context.Provider value={value}>
                <App/>
            </Context.Provider>
        )
    }
}