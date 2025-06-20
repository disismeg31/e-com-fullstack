/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import {createContext,useState}from 'react';
export const  ThemeContext = createContext();
 

function ThemeContextProvider({children}) {
  const [theme, setTheme] = useState('light');

  const themeData = {
    themeName: theme,
    updateTheme: () => {
      setTheme(theme === 'dark' ? 'light': 'dark' )
    }
  };

  return (
    <ThemeContext.Provider value={themeData}>
        {children}
    </ThemeContext.Provider>
     
  )
}

export default ThemeContextProvider;

 