import { useState } from "react";

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = async (token, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || "Unexpected server response");
      }
      if (!response.ok) {
        setError(data?.error || "Failed to reset password");
        setIsLoading(false);
        return { error: data?.error || "Failed to reset password" };
      }
      setError(null);
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      setError(error.message || "An error occurred while resetting the password");
      return { error: error.message };
    }
  };

  return { resetPassword, isLoading, error};
};
