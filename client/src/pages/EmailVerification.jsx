import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVerification } from "../hooks/useVerification";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading } = useVerification();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const passedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = passedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const verificationCode = code.join("");

  const result = await verifyEmail(verificationCode);

  if (result.success) {
    toast.success("Email verified successfully!");
    navigate("/");
  } else {
    toast.error(result.error);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  }
};

  return (
    <div className="bg-gradient-to-br text-white from-violet-500 to-fuchsia-950 h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-center">Verify Your Email</h1>
        <p className="text-center mt-4">
          A verification code has been sent to your email. Please enter the
          6-digit code sent your email address.
        </p>
        <p className="text-center mt-2">
          If you didn't receive the email, please check your spam folder or{" "}
          <a href="/resend-verification" className="text-blue-500">
            click here to resend the verification email
          </a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center space-x-2 mt-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => digit === "")}
            aria-label="Verify Email"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
