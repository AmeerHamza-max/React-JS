// create the context

import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

// create the global state that recipe component as a children

function GlobalState({children}){
    const [theme,setTheme]=useState('light');

    function handleChangeThemeOnButtonClick(){
        setTheme(theme==='light' ? 'dark':'light')
    }
    return <GlobalContext.Provider value={{theme,handleChangeThemeOnButtonClick}}>{children}</GlobalContext.Provider>
}

export default GlobalState;

