import { motion, AnimatePresence } from "framer-motion";
import { closeIcon } from "./Icons";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md p-6 bg-white text-black rounded-2xl shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-1 rounded-full"
              >
                {closeIcon}
              </motion.div>
            </button>

            <div className="text-center flex items-center gap-4 p-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
