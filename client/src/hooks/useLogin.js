import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const json = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      } else {
        setError(json.error || "Login failed");
        setPassword("");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    login,
    email,
    password,
    setEmail,
    setPassword,
    error,
    isLoading,
  };
};
