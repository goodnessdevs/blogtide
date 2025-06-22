import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import Posts from "../components/Posts";
import { ThemeContext } from "../context/ThemeContext";
import { next } from "../components/Icons";

const Home = () => {
  const { isDark, darkTheme, lightTheme } = useContext(ThemeContext);
  const theme = isDark ? lightTheme : darkTheme;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      transition={{ duration: 0.5, ease: "linear" }}
      className="p-10 md:px-14 md:pt-36 h-full roboto-condensed"
    >
      <div className="relative md:top-10 top-10 space-y-5 text-center md:text-start">
        <h1 className={`${theme.text2} text-5xl font-bold`}>BlogTide</h1>
        <p className={`text-xl ${theme.text1} md:w-3/4`}>
          A space dedicated to exploring innovative ideas, inspiring stories,
          and practical strategies for creatives, entrepreneurs, and lifelong
          learners seeking growth.
        </p>

        <div className="hidden mt-8 mb-0 md:flex space-x-10">
          <Link to="/about">
            <motion.button className="text-black cursor-pointer rounded p-2 bg-violet-200 hover:bg-violet-300 active:bg-violet-500 transition duration-300 shadow text-xl w-48">
              About
            </motion.button>
          </Link>
          <Link to="/support">
            <motion.button className="text-black cursor-pointer rounded p-2 bg-violet-200 hover:bg-violet-300 active:bg-violet-500 transition duration-300 shadow text-xl w-48">
              Customer Service
            </motion.button>
          </Link>
        </div>

        <div className="relative top-16 me-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold mb-4">Recent posts</h2>
            <Link
              to={"/blogs"}
              className="text-blue-600 flex items-center hover:font-semibold hover:underline"
            >
              More posts {next}
            </Link>
          </div>
          <hr />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
            viewport={{ once: false }}
            className="p-10"
          >
            <Posts limit={8} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
