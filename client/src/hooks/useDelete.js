import { useAuthContext } from "./useAuthContext";

export const useDelete = () => {
  const { dispatch, user } = useAuthContext();

  if (!user) return { deleteAccount: async () => {} };

  const deleteAccount = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/${user.user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      alert("Server error");
    }
  };

  return {
    deleteAccount,
  };
};
