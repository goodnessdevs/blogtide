import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";
import Theme from "./Theme";
import { logoutIcon, burgerIcon, closeIcon } from "./Icons";

const linkVariant = {
  initial: { scale: 1 },
  hover: { scale: 1.3, transition: { duration: 0.2, ease: "linear" } },
};

const menuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [burger, setBurger] = useState(false);
  const navbarRef = useRef(null);
  const brandRef = useRef(null);
  const logoutRef = useRef(null);
  const themeRef = useRef(null);

  const handleClick = () => setBurger((prev) => !prev);
  const hideBurger = () => setBurger(false);
  const handleLogout = async () => {
    setBurger(false);
    const res = await logout();
    if (!res.error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      burger && window.innerWidth < 768 ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [burger]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      const brand = brandRef.current;
      const logoutRefCurrent = logoutRef.current;
      const themeRefCurrent = themeRef.current;

      if (!navbar) return;

      if (window.scrollY > 50) {
        navbar.classList.add(
          "md:bg-fuchsia-600",
          "md:rounded-full",
          "md:shadow-md",
          "md:text-white",
          "md:top-10",
          "md:mx-auto",
          "md:w-fit",
          "md:left-1/2",
          "md:-translate-x-1/2",
          "overflow-hidden"
        );
        navbar.classList.remove("bg-transparent", "w-full");
        brand?.classList.add("md:hidden");
        logoutRefCurrent?.classList.add("md:hidden");
        themeRefCurrent?.classList.remove("md:hidden");
        themeRefCurrent?.classList.add("md:block");
      } else {
        navbar.classList.remove(
          "md:bg-fuchsia-600",
          "md:rounded-full",
          "md:shadow-md",
          "md:text-white",
          "md:top-10",
          "md:mx-auto",
          "md:w-fit",
          "md:left-1/2",
          "md:-translate-x-1/2",
          "overflow-hidden"
        );
        navbar.classList.add("bg-transparent", "w-full");
        brand?.classList.remove("md:hidden");
        logoutRefCurrent?.classList.remove("md:hidden");
        themeRefCurrent?.classList.remove("md:hidden");
        themeRefCurrent?.classList.add("md:block");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      className="p-4 bg-transparent md:flex md:justify-between md:items-center md:fixed md:z-50 md:h-fit w-full"
      ref={navbarRef}
    >
      <div className="flex justify-between items-center w-full md:w-auto">
        <h1
          ref={brandRef}
          className="font-bold block ms-10 text-2xl lobster-regular"
        >
          <Link to="/">BlogTide</Link>
        </h1>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className="p-1 cursor-pointer md:hidden rounded-full me-8 hover:bg-gray-50 hover:text-gray-500"
        >
          {burger ? closeIcon : burgerIcon}
        </motion.button>
      </div>

      {/* Animated mobile menu */}
      <AnimatePresence>
        {burger && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="text-center space-y-1 p-10 md:hidden bg-gradient-to-t from-white to-violet-200 rounded-md mx-8 h-screen overflow-auto"
          >
            {["/", "/blogs", "/write", "/account", "/about", "/support"].map(
              (to, index) => (
                <Link to={to} key={to} onClick={hideBurger}>
                  <motion.span
                    variants={linkVariant}
                    initial="initial"
                    whileHover="hover"
                    className={`block font-bold m-4 p-2 rounded cursor-pointer active:text-fuchsia-500 text-violet-950`}
                  >
                    {
                      [
                        "Home",
                        "Blog",
                        "Publish",
                        "Account",
                        "About",
                        "Contact us",
                      ][index]
                    }
                  </motion.span>
                </Link>
              )
            )}

            <div className="flex justify-center items-center text-black">
              <Theme hideBurger={hideBurger} />
            </div>

            {!user ? (
              <div className="mt-6 space-y-3 flex flex-col items-center">
                <Link to="/login" onClick={hideBurger}>
                  <motion.span
                    whileHover={{ borderRadius: 20 }}
                    className="block w-fit p-2 font-semibold text-fuchsia-500"
                  >
                    Log in
                  </motion.span>
                </Link>
                <Link to="/signup" onClick={hideBurger}>
                  <motion.span
                    initial={{ borderRadius: 5 }}
                    whileHover={{ borderRadius: 20 }}
                    className="block w-fit p-2 font-semibold bg-fuchsia-500 text-white"
                  >
                    Get started
                  </motion.span>
                </Link>
              </div>
            ) : (
              <div className="mt-6">
                <motion.button
                  initial={{ borderRadius: 5 }}
                  whileHover={{ borderRadius: 20 }}
                  onClick={handleLogout}
                  className="text-fuchsia-600 w-full flex justify-center items-center p-2 font-semibold border-2 border-fuchsia-500"
                >
                  Log out {logoutIcon}
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP NAV LINKS */}
      <div className="hidden md:flex justify-evenly gap-x-10 items-center">
        {["/", "/blogs", "/write", "/account"].map((to, index) => (
          <Link to={to} key={to}>
            <motion.span
              variants={linkVariant}
              initial="initial"
              whileHover="hover"
              className="md:font-semibold block font-bold p-2 rounded cursor-pointer"
            >
              {["Home", "Blog", "Publish", "Account"][index]}
            </motion.span>
          </Link>
        ))}

        <div className="flex gap-3 items-center ml-56 mr-10" ref={logoutRef}>
          <div ref={themeRef} className="md:block">
            <Theme />
          </div>
          {!user ? (
            <>
              <Link to="/login">
                <motion.span
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.15 }}
                  className="block w-fit p-2 font-semibold text-fuchsia-500"
                >
                  Log in
                </motion.span>
              </Link>
              <Link to="/signup">
                <motion.span
                  initial={{ borderRadius: 5 }}
                  whileHover={{ borderRadius: 20 }}
                  className="block p-2 font-semibold bg-fuchsia-500 text-white"
                >
                  Get started
                </motion.span>
              </Link>
            </>
          ) : (
            <motion.button
              initial={{ borderRadius: 5 }}
              whileHover={{ borderRadius: 20 }}
              onClick={handleLogout}
              className="text-fuchsia-600 p-2 flex items-center font-semibold border-2 border-fuchsia-500"
            >
              Log out {logoutIcon}
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
