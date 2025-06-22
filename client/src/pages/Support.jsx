import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/")}
        className="fixed z-10 md:relative cursor-pointer top-4 left-4 md:top-4 md:left-4 flex justify-center items-center p-2 w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-700 dark:bg-gray-500 transition duration-200"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" />
      </button>

      <div className="w-[410px] md:w-3/4 mx-auto p-6 md:p-10 text-base text-gray-800 bg-white rounded-lg shadow-lg mt-20 md:mt-10 mb-10 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-blue-700 tracking-tight">
          Customer Service
        </h1>
        <p className="text-center text-gray-500 mb-6">We’re here to help!</p>
        <h2 className="text-lg font-semibold text-center mb-8 text-gray-700">
          At <span className="text-blue-600 font-bold">BlogTide</span>, we value
          your experience and aim to provide timely, friendly support. While we
          primarily offer informative content, we’re happy to assist with:
        </h2>
        <ul className="list-disc ml-8 text-gray-700 mb-8 space-y-1">
          <li>Questions about blog content</li>
          <li>Reporting broken links or website issues</li>
          <li>Requests for topics you'd like us to cover</li>
          <li>Issues with email subscriptions or comments</li>
        </ul>
        <p className="text-gray-700 mb-4">
          We aim to respond to all inquiries within{" "}
          <span className="font-semibold">48 hours</span> on business days.
        </p>
        <div className="my-8">
          <h2 className="text-xl font-bold text-blue-600 mb-2 flex items-center justify-center">
            📬 Contact Us
          </h2>
          <p className="text-gray-700 mb-2 text-center">
            Have a question or want to reach out?
          </p>
          <p className="text-center">
            You can contact us via email at:
            <br />
            <a
              href="mailto:devswithgoody82@gmail.com"
              className="text-blue-500 underline hover:text-blue-700 font-semibold"
            >
              devswithgoody82@gmail.com
            </a>
          </p>
          <p className="text-center mt-2">
            Or give us a call at:
            <br />
            <a
              href="tel:+2348070613801"
              className="text-blue-500 underline hover:text-blue-700 font-semibold"
            >
              +234 807 061 3801
            </a>
          </p>
          <p className="text-center mt-2">
            Or fill out the contact form on our website (if applicable), and
            we’ll get back to you as soon as possible.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold text-blue-600 mb-2">🔐 Note:</h2>
          <p className="text-gray-700 leading-relaxed">
            We respect your privacy. Any information you share with us will be
            handled in accordance with our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
