import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [state, setState] = useState({
    isDark: true,
    darkTheme: {
      bg0: "bg-gradient-to-bl from-gray-950 to-fuchsia-950 transition duration-500",
      bg1: "bg-fuchsia-100 hover:bg-fuchsia-300 active:bg-fuchsia-500 transition duration-500",
      bg2: "bg-gray-700 transition duration-500",
      bg3: "bg-fuchsia-800 transition duration-500",
      text0: "text-white transition duration-500",
      text1: "text-gray-100 transition duration-500",
      text2: "text-fuchsia-50 transition duration-500",
      text3: "text-gray-500 transition duration-500",
    },
    lightTheme: {
      bg0: "bg-gradient-to-br from-white to-violet-200 transition duration-500",
      bg1: "bg-fuchsia-100 hover:bg-fuchsia-300 active:bg-fuchsia-500 transition duration-500",
      bg2: "bg-gray-100 transition duration-500",
      bg3: "bg-fuchsia-500 transition duration-500",
      text0: "text-black transition duration-500",
      text1: "text-gray-700 transition duration-500",
      text2: "text-fuchsia-700 transition duration-500",
      text3: "text-black transition duration-500",
    },
  });

  const themeToggler = () => {
    setState((state) => ({
      ...state,
      isDark: !state.isDark,
    }));
  };

  return (
    <ThemeContext.Provider value={{ ...state, themeToggler }}>
      {props.children}
    </ThemeContext.Provider>
  );
};