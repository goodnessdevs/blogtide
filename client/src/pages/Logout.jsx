import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000); // Redirect after 2 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-100 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold text-violet-700 mb-4">You have been logged out</h1>
        <p className="text-gray-700 mb-2">Thank you for visiting BlogTide.</p>
        <p className="text-gray-500">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default Logout;
