import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { showPasswordIcon, hidePasswordIcon } from "../components/Icons";
import Loading from "../components/Loading";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, email, password, setEmail, setPassword, error, isLoading } =
    useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-950 px-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-violet-600 lobster-regular">
          BlogTide
        </h1>
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? hidePasswordIcon : showPasswordIcon}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="text-center p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg shadow-md font-semibold transition duration-200"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </motion.button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
