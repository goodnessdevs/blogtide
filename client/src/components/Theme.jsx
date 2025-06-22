import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { sun } from "./Icons";
import { moon } from "./Icons";

const Theme = ({ hideBurger }) => {
  const [themeIcon, setThemeIcon] = useState(true);
  const { themeToggler } = useContext(ThemeContext);

  const handleTheme = () => {
    setThemeIcon(!themeIcon);
    themeToggler();
    hideBurger();
  };

  return (
    <button
      type="button"
      className="relative top-3.5 md:top-0 rounded-4xl w-10 h-10 hover:bg-gray-500 flex justify-center items-center"
      onClick={handleTheme}
    >
      {themeIcon ? moon : sun}
    </button>
  );
};

export default Theme;
