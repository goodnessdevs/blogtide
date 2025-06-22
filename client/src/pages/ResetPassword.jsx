import { useState } from "react";
import { motion } from "framer-motion";
import { useResetPassword } from "../hooks/useResetPassword";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { showPasswordIcon, hidePasswordIcon } from "../components/Icons";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, error, isLoading, message } = useResetPassword();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await resetPassword(token, password);
      if (!res.error) {
        toast.success(
          "Password reset successfully, redirecting to login page..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.message || "An error occurred while resetting the password");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-500 to-fuchsia-950 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
    >
      <div className="w-full max-w-md bg-gray-200 rounded-xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-fuchsia-700 text-center tracking-tight">
          Reset Password
        </h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-gray-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-600"
            >
              {showPassword ? hidePasswordIcon : showPasswordIcon}
            </button>
          </div>
          
          <div className="relative w-full">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-gray-50"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-600"
            >
              {showConfirmPassword ? hidePasswordIcon : showPasswordIcon}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-fuchsia-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-fuchsia-700 transition-all duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-200"
        >
          Back to Login
        </button>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
