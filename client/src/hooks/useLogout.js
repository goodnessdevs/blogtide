import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });

      return { success: true };
    } catch (error) {
      return { error: error.message || "Logout failed" };
    }
  };

  return { logout };
};

