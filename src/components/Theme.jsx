import { useState } from "react" 

import "./Theme.css" 

export default function Theme({children}) 

{
    const [theme, setTheme] = useState('light'); 

    const toggleTheme = () => (
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    );
    return(
        <>
            <div className={theme}>
                <button className="themeButton" onClick={toggleTheme}>
                    Alternar Tema ({theme === 'light' ? 'Escuro' : 'Claro'})
                </button>
                {children} 
            </div>
        </>
    ) 
}