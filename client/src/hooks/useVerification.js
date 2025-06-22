import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const verifyEmail = async (code) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
        return { success: true };
      } else {
        setError(json.message || "Verification failed");
        setIsLoading(false);
        return { success: false, error: json.message || "Verification failed" };
      }
    } catch (error) {
      setError("Server error");
      setIsLoading(false);
      return { success: false, error: "Server error" };
    }
  };

  return { verifyEmail, isLoading, error };
};
