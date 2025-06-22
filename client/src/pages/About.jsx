import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/")}
        className="fixed z-10 md:relative cursor-pointer top-4 left-4 md:top-4 md:left-4 flex justify-center items-center p-2 w-14 h-14 rounded-full bg-white shadow-md hover:bg-white/50 dark:bg-gray-500 transition duration-200"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" />
      </button>

      <div className="w-[400px] md:w-[600px] mx-auto px-6 py-12 bg-white/80 dark:bg-gray-900/80 rounded-lg shadow-lg mt-20 md:mt-10 mb-16">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
          About BlogTide
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
          Welcome to{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            BlogTide
          </span>{" "}
          — where ideas flow.
        </p>
        <p className="mb-4 text-gray-800 dark:text-gray-100">
          At BlogTide, we believe in the power of storytelling, insights, and
          fresh perspectives. This is more than just a blog; it’s a curated
          stream of content spanning technology, creativity, personal growth,
          and everything in between.
        </p>
        <p className="mb-6 text-gray-800 dark:text-gray-100">
          Founded and maintained by{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Devswithgoody
          </span>
          , BlogTide is a space built for curious minds and passionate readers.
          Whether you're here to learn something new, explore thought-provoking
          ideas, or simply enjoy well-crafted content — you're in the right
          place.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2 mt-8">
          Who We Are
        </h2>
        <p className="mb-6 text-gray-800 dark:text-gray-100">
          Devswithgoody is a software developer and digital creator passionate
          about building clean, useful, and engaging experiences on the web.
          BlogTide is an extension of that passion — where code meets
          creativity, and thoughts become stories worth sharing.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2 mt-8">
          Why BlogTide?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-100 mb-8">
          <li>
            <span className="font-medium">✍️ Fresh, original content</span>
          </li>
          <li>
            <span className="font-medium">
              🌊 A flowing mix of tech, life, and creativity
            </span>
          </li>
          <li>
            <span className="font-medium">
              🤝 Community-driven ideas and engagement
            </span>
          </li>
        </ul>
        <p className="italic text-gray-600 dark:text-gray-400 text-center">
          We’re constantly evolving, just like the tide. Stick around — there’s
          more coming.
        </p>
      </div>
    </div>
  );
};

export default About;
