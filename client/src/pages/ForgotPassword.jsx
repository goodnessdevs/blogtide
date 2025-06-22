import { motion } from "framer-motion";
import { useState } from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { isLoading, error, forgotPassword } = useForgotPassword();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <div className="bg-gradient-to-br text-white from-violet-500 to-fuchsia-950 h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Forgot Password
          </h2>
          {isSubmitted ? (
            <p className="text-green-500 text-center">
              Check your email for reset instructions.
            </p>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const result = await forgotPassword(email);
                if (result) {
                  setIsSubmitted(true);
                }
              }}
            >
              <div className="relative w-full mb-6">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full p-2 pl-10 border border-gray-300 rounded"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full p-2 bg-blue-600 text-white hover:bg-blue-800 rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-4 p-2 bg-gray-800 text-white rounded hover:bg-fuchsia-900 transition"
          >
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2" />
            Back to Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
