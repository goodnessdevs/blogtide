import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext.js";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (username, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
        credentials: "include",
      });

      const json = await response.json();

      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        navigate("/verify-email"); 
      } else {
        setError(json.error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Server error");
    }
  };

  return {
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
  };
};
