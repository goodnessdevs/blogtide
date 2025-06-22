import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

const View = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const { isDark, darkTheme, lightTheme } = useContext(ThemeContext);
  const theme = isDark ? lightTheme : darkTheme;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // Don't fetch if id is missing
    if (!user) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          initial={{ scale: 1 }}
          animate={{
            scale: 1.1,
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.3,
            },
          }}
          className="text-2xl font-semibold"
        >
          Loading...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "linear" }}
      className="p-4"
    >
      <button
        onClick={() => navigate(-1)}
        className="fixed z-10 md:relative cursor-pointer top-4 left-4 md:top-4 md:left-4 flex justify-center items-center p-2 w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-700 dark:bg-gray-500 transition duration-200"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="xl" />
      </button>

      <article className="flex flex-col mt-16 md:mt-0 text-center md:text-start items-center p-6 space-y-5">
        {blog.image && (
          <div className="w-96 rounded-md">
            <img
              src={`http://localhost:4000${blog.image}`}
              alt={blog.title}
              className="object-contain w-full max-w-md h-auto rounded-md"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-wider">{blog.title}: {blog.subtitle}</h1>

        <div className="flex justify-around items-center w-full mt-4">
          <p className={`text-xl ${theme.text1} font-semibold tracking-wider`}>
            {format(new Date(blog.date), "MMMM dd, yyyy")}
          </p>
          <p
            className={`text-xl ${theme.text1} text-center font-medium tracking-wide`}
          >
            By {blog.author}
          </p>
        </div>
        <div
          className="blog-body prose lg:prose-lg mt-4 max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
      </article>

      <Footer />
    </motion.div>
  );
};

export default View;
