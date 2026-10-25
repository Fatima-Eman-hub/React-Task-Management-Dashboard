import {createContext} from "react";
import {useContext} from "react";
import {useState} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-shell ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

