import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSignup } from "../hooks/useSignup";
import { showPasswordIcon, hidePasswordIcon } from "../components/Icons";
import Loading from "../components/Loading";

const Getstarted = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    signup,
    username,
    email,
    password,
    confirmPassword,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    error,
    isLoading,
  } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password, confirmPassword);
    if (localStorage.getItem("user")) {
      navigate("/verify-email");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
      className="grid grid-cols-1 bg-gradient-to-bl from-gray-800 to-black md:grid-cols-12 min-h-screen overflow-hidden"
    >
      <div className="col-span-full md:col-span-5 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm text-white space-y-6"
        >
          <h1 className="text-4xl font-extrabold lobster-regular text-violet-500 text-center">
            BlogTide
          </h1>
          <h2 className="text-2xl font-semibold text-center underline">
            Get started
          </h2>

          {/* Username */}
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-400 focus:border-violet-600 focus:outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-400 focus:border-violet-600 focus:outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-400 focus:border-violet-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showPassword ? hidePasswordIcon : showPasswordIcon}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-transparent border-b-2 border-gray-400 focus:border-violet-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            >
              {showConfirmPassword ? hidePasswordIcon : showPasswordIcon}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 bg-white px-4 py-2 rounded border border-red-400 text-center">
              {error}
            </div>
          )}

          {/* Sign Up Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-violet-600 hover:bg-violet-700 rounded-full font-semibold text-white transition"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </motion.button>

          {/* Already have account */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side Fountain Image */}
      <div className="hidden md:block md:col-span-7  m-4 rounded-md fountain bg-cover bg-no-repeat bg-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-violet-500 bg-gradient-to-bl from-gray-800 to-black p-4 rounded-md lobster-regular">
            Welcome to BlogTide
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Getstarted;
