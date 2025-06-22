import { motion } from "framer-motion";

const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-violet-500 to-fuchsia-950">
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ rotateZ: 0 }}
        animate={{
          rotateZ: 360,
        }}
        transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        className="ease-linear rounded-full border-5 border-t-5 border-t-blue-500 border-gray-200 h-16 w-16 mb-4"
      ></motion.div>
    </div>
  </div>
);

export default Loading;
