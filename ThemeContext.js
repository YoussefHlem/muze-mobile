// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./utils/Theme.styled";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState("dark");
  const [theme, setTheme] = useState(colorScheme === "dark" ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setColorScheme(!colorScheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
