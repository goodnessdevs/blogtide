import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDelete } from "../hooks/useDelete";
import { useResetPassword } from "../hooks/useResetPassword";

const Account = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { deleteAccount } = useDelete();
  const { resetPassword } = useResetPassword();
  const { user } = useAuthContext();
  const [modalType, setModalType] = useState(null);
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleReset = async () => {
    try {
      await resetPassword();
      navigate("/change-password");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      navigate("/login");
    } catch (err) {
      setError("Failed to delete account. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-fuchsia-900 text-black dark:text-gray-100 flex flex-col"
    >
      <button
        onClick={() => navigate(-1)}
        className="fixed z-10 md:relative cursor-pointer top-4 left-4 md:top-4 md:left-4 flex justify-center items-center p-2 w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-700 dark:bg-gray-500 transition duration-200"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="xl" />
      </button>

      <div className="md:w-[500px] mx-auto mt-10 md:mt-0">
        <div className="w-full max-w-lg mx-auto rounded-2xl bg-white/90 dark:bg-gray-900/90 p-10 shadow-2xl mt-20 md:mt-10 border border-blue-100 dark:border-gray-700">
          <h1 className="font-extrabold text-4xl md:text-5xl text-center text-violet-700 dark:text-violet-300 mb-8 tracking-tight underline underline-offset-4">
            Account Details
          </h1>
          <div className="space-y-6 text-lg md:text-xl mb-10">
            <p className="border border-blue-200 dark:border-gray-700 p-4 rounded-lg bg-blue-50 dark:bg-gray-800/60">
              Username:{" "}
              <span className="font-bold text-blue-700 dark:text-blue-300">
                {user.user.username}
              </span>
            </p>
            <p className="border border-blue-200 dark:border-gray-700 p-4 rounded-lg bg-blue-50 dark:bg-gray-800/60">
              Email:{" "}
              <span className="font-bold text-blue-700 dark:text-blue-300">
                {user.user.email}
              </span>
            </p>
          </div>

          <hr className="border-blue-200 dark:border-gray-700 mb-8" />

          <div className="mt-6">
            <button
              className="w-full cursor-pointer p-4 rounded-lg font-bold text-lg flex items-center justify-center gap-x-4 bg-blue-100 dark:bg-blue-900 text-white border border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors shadow-md"
              type="button"
              onClick={() => setModalType("reset")}
            >
              Change password
            </button>
          </div>

          <div className="mt-6">
            <button
              className="w-full cursor-pointer p-4 rounded-lg font-bold text-lg flex items-center justify-center gap-x-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800 transition-colors shadow-md"
              type="button"
              onClick={() => setModalType("delete")}
            >
              Delete account
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="lg"
                color="currentColor"
              />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalType === "reset"} onClose={() => setModalType(null)}>
        <div className="flex flex-col items-center gap-6 p-4">
          <div
            className="bg-amber-200 border border-amber-500 text-amber-800 p-4 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Warning!</strong>
            <span className="block sm:inline ml-2">
              Resetting your password will log you out of all devices. Are you
              sure you want to continue?
            </span>
          </div>
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white text-xl p-3 rounded-md shadow-md cursor-pointer hover:bg-blue-700 transition duration-500 active:bg-blue-500"
          >
            Reset Password
          </button>
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </Modal>

      <Modal isOpen={modalType === "delete"} onClose={() => setModalType(null)}>
        <div className="flex flex-col items-center gap-6 p-4">
          <div
            className="bg-red-200 border border-red-500 text-red-800 p-4 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Warning!</strong>
            <span className="block sm:inline ml-2">
              Deleting your account is permanent and cannot be undone. All your
              data will be lost. Are you sure you want to continue?
            </span>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white text-xl p-3 rounded-md shadow-md cursor-pointer hover:bg-red-700 transition duration-500 active:bg-red-500"
          >
            Delete
          </button>
          {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </Modal>

      <Footer />
    </motion.div>
  );
};

export default Account;
