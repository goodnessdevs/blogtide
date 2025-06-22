import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
          Terms of Service
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Effective Date: <span className="font-semibold">June 8, 2025</span>
        </p>
        <h2 className="text-lg font-semibold text-center mb-8 text-gray-700">
          Welcome to <span className="text-blue-600 font-bold">BlogTide</span>.
          These Terms of Service govern your access to and use of our blog,
          website, and services.
        </h2>
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our Service, you agree to be bound by these
              Terms and our Privacy Policy. If you do not agree, please do not
              use our Service.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              2. Use of the Service
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You may use the Service for personal, non-commercial purposes in
              accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc ml-8 text-gray-700 mt-2 space-y-1">
              <li>Post unlawful, offensive, or harmful content.</li>
              <li>Infringe on any intellectual property rights.</li>
              <li>Attempt to access restricted areas or data.</li>
              <li>Use the Service for spam, abuse, or disruptive behavior.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">3. Content</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on the blog is for informational purposes only. We do
              not guarantee the accuracy, completeness, or usefulness of any
              information provided. Content created by third parties or
              commenters reflects their own views.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              4. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this site, including text, images, graphics, and
              code, is owned by or licensed to BlogTide unless stated otherwise.
              You may not reproduce, distribute, or modify any content without
              written permission.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              5. User Submissions
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By submitting content (comments, posts, feedback), you grant us a
              non-exclusive, royalty-free license to use, display, and
              distribute your content on the Service.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              6. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or restrict your access to the
              Service at our discretion, without notice, for conduct that
              violates these Terms.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              7. Disclaimers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Service is provided “as is” without warranties of any kind. We
              are not responsible for any damages or losses resulting from the
              use or inability to use the Service.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall BlogTide, its owners, or affiliates be liable
              for any indirect or consequential damages arising out of your use
              of the Service.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. Continued
              use of the Service constitutes your acceptance of the revised
              Terms.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              10. Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms, contact us at:{" "}
              <a
                href="mailto:geenine77@gmail.com"
                className="text-blue-500 underline hover:text-blue-700"
              >
                devswithgoody82@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
