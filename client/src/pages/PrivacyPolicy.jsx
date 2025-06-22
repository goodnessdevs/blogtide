import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
        <h1 className="text-4xl font-extrabold text-center mb-2 text-blue-700 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Effective Date: <span className="font-semibold">June 8, 2025</span>
        </p>
        <h2 className="text-lg font-semibold text-center mb-8 text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how{" "}
          <span className="text-blue-600 font-bold">BlogTide</span> collects,
          uses, and protects your personal information.
        </h2>
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              1. Information We Collect
            </h2>
            <ul className="list-disc ml-8 text-gray-700 mt-2 space-y-1">
              <li>
                <span className="font-semibold">Personal Information:</span>{" "}
                Name, email address (when provided voluntarily, such as in
                comments or newsletter sign-up).
              </li>
              <li>
                <span className="font-semibold">Usage Data:</span> IP address,
                browser type, pages visited, time spent, and other anonymous
                analytics data via cookies or third-party tools (like Google
                Analytics).
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ml-8 text-gray-700 mt-2 space-y-1">
              <li>Operate and improve our blog and services.</li>
              <li>Respond to comments or inquiries.</li>
              <li>Send newsletters (only if you subscribe).</li>
              <li>Analyze traffic and usage trends.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">3. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We may use cookies and similar technologies to enhance your
              experience. You can choose to disable cookies through your browser
              settings.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              4. Sharing of Information
            </h2>
            <ul className="list-disc ml-8 text-gray-700 mt-2 space-y-1">
              <li>
                We do not sell or rent your personal information. We may share
                it:
              </li>
              <li>
                With service providers who help operate the site (e.g., hosting,
                analytics).
              </li>
              <li>If required by law or to protect rights and safety.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              5. Third-Party Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our blog may contain links to third-party websites. We are not
              responsible for their content or privacy practices.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              6. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement reasonable security measures to protect your data.
              However, no system is 100% secure.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              7. Your Rights
            </h2>
            <ul className="list-disc ml-8 text-gray-700 mt-2 space-y-1">
              <li>Request access to the data we have about you.</li>
              <li>Ask us to correct or delete your personal data.</li>
              <li>Unsubscribe from emails at any time.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically. We encourage you
              to review it regularly.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">9. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For any questions about this policy, contact us at:{" "}
              <a
                href="mailto:your@email.com"
                className="text-blue-500 underline hover:text-blue-700"
              >
                devswithgoody82@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
