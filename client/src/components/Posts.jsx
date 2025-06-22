import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const Posts = ({ limit }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const cleanHtml = (rawHtml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) return;
      console.log("Sending token:", user.token);

      try {
        // const token = JSON.parse(localStorage.getItem("user"))?.token;

        const response = await fetch("http://localhost:4000/api/blogs/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Fetch failed:", data.error);
          setError(data.error);
          return;
        }
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
        setError("Failed to load blogs");
      }
    };
    fetchBlogs();
  }, [user]);

  if (!user) {
    return <p>You must be logged in to see blogs.</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Only show up to 'limit' blogs if limit is provided
  const displayedBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-center gap-8 p-4">
      {isLoading ? (
        <motion.p
          initial={{ scale: 1 }}
          animate={{
            scale: 1.05,
            transition: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.3,
            },
          }}
          className="text-2xl w-fit h-fit font-semibold col-span-full text-center"
        >
          Loading...
        </motion.p>
      ) : (
        displayedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="rounded-xl border border-gray-200 p-5 shadow-lg w-full max-w-xs bg-white hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
          >
            <h2
              className="text-lg font-bold text-black mb-2 truncate"
              title={blog.title}
            >
              {blog.title}
            </h2>
            <p className="text-xs text-gray-500 mb-2">
              {format(new Date(blog.date), "MMMM d, yyyy")}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {cleanHtml(blog.body).slice(0, 120)}...
            </p>
            <Link
              to={`/blogs/${blog._id}`}
              className="mt-auto inline-block text-blue-600 hover:underline font-semibold text-sm"
            >
              Read More
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
