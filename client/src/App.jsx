import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Getstarted from "./pages/Getstarted";
import Publish from "./pages/Publish";
import Blogs from "./pages/Blogs";
import View from "./pages/View";
import Support from "./pages/Support";
import About from "./pages/About";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import Logout from "./pages/Logout";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import ScrollToTop from "./components/ScrollToTop";
import { useAuthContext } from "./hooks/useAuthContext";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { isDark, darkTheme, lightTheme } = useContext(ThemeContext);
  const theme = isDark ? lightTheme : darkTheme;

  const location = useLocation();

  const { user } = useAuthContext();

  const hideNavbarPaths = [
    "/signup",
    "/login",
    "/terms-of-service",
    "/privacy-policy",
    "/customer",
    "/verify-email",
    "/oauth-success",
    "/account",
    "/about",
    "/write",
    "/logout",
    "/forgot-password",
    "/support",
    "/change-password",
  ];

  const hideFooterPaths = [
    "/signup",
    "/login",
    "/verify-email",
    "/oauth-success",
    "/account",
    "/account-deletion",
    "/logout",
    "/forgot-password",
    "/change-password",
  ];

  const isBlogViewPage = location.pathname.startsWith("/blogs/");
  const isResetPasswordPage = location.pathname.startsWith("/reset-password");

  const shouldHaveNavbar =
    (hideNavbarPaths.includes(location.pathname) || isBlogViewPage || isResetPasswordPage) === false;

  const shouldHaveFooter =
    (hideFooterPaths.includes(location.pathname) || isBlogViewPage || isResetPasswordPage) === false;

  return (
    <div className={`roboto h-full bg-violet-500 ${theme.text0} ${theme.bg0}`}>
      <ScrollToTop />
      {shouldHaveNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/blogs"
            element={user ? <Blogs /> : <Navigate to="/login" />}
          />
          <Route
            path="/write"
            element={user ? <Publish /> : <Navigate to="/login" />}
          />
          <Route
            path="/blogs/:id"
            element={user ? <View /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/support"
            element={<Support />}
          />
          <Route
            path="/terms-of-service"
            element={<TermsOfService />}
          />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />
          <Route path="/account" element={user && <Account />} />
          <Route
            path="/signup"
            element={!user ? <Getstarted /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/logout" element={<Logout />} />

          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </AnimatePresence>
      {shouldHaveFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
