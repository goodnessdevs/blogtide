import { motion } from "framer-motion";
import Posts from "../components/Posts";

const Blogs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      transition={{ duration: 0.5, ease: "linear" }}
      className="p-20 pt-40"
    >
      <Posts />
    </motion.div>
  );
};

export default Blogs;
