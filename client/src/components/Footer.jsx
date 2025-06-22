import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mb-0 h-60 mt-36 p-4 bg-gray-600 text-white flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold text-white mb-4">BlogTide</h2>
      <p>
        &copy; {new Date().getFullYear()} Devswithgoody. All rights reserved.
        <br />
      </p>

      <p className="space-x-4 mt-4">
        <a
          href="http://wa.me/08070613801"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="2x" />
        </a>

        <a
          href="http://wa.me/08070613801"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>

        <a
          href="http://wa.me/08070613801"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </p>

      <div className="flex space-x-6 mt-4">
        <Link
          to="/privacy-policy"
          className="text-white hover:underline hover:font-semibold mt-2"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms-of-service"
          className="text-white hover:underline hover:font-semibold mt-2"
        >
          Terms of Service
        </Link>

        <Link
          to="/support"
          className="text-white hover:underline hover:font-semibold mt-2"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Footer;
