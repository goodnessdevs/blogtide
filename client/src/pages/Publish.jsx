import { motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/themes/dark.min.css";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/lists.min.js";

import { ThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Modal from "../components/Modal";
import { addIcon, successIcon } from "../components/Icons";

const Publish = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    date: "",
    author: "",
    image: null,
    body: "",
  });

  const navigate = useNavigate();

  const [messageShown, setMessageShown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);
  const { user } = useAuthContext();

  const { isDark, darkTheme, lightTheme } = useContext(ThemeContext);
  const theme = isDark ? darkTheme : lightTheme;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file && file.size > 1 * 1024 * 1024) {
        alert("Image must be less than 1MB");
        return;
      }
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("date", formData.date);
    data.append("author", formData.author);
    data.append("body", formData.body);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/`, {
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Blog created successfully!");
        setFormData({
          title: "",
          subtitle: "",
          date: "",
          author: "",
          body: "",
          image: null,
        });
        setPreview(null);
        setMessageShown(true);
        setIsModalOpen(true);
      } else {
        setMessage(result.message || "Failed to create blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <motion.div
      exit={{
        opacity: 0,
        y: 100,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      className={``}
    >
      {messageShown && (
        <div className={`flex justify-center`}>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {successIcon}
            <h2 className={`font-bold text-black text-2xl`}>{message}</h2>
          </Modal>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="relative cursor-pointer top-6 left-6 md:top-6 md:left-6 flex justify-center items-center p-2 w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-700 dark:bg-gray-500 transition duration-200"
        aria-label="Go back"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" />
      </button>

      <div className="flex justify-center items-start p-6 sm:p-10 md:p-16 lg:p-20 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-xl h-full mt-20 md:mt-0 p-6 sm:p-10 space-y-10"
          encType="multipart/form-data"
        >
          <h2 className="text-4xl font-bold text-center text-white">
            Write a Blog
          </h2>

          <div>
            <label
              htmlFor="title"
              className="text-xl font-semibold block mb-2 text-gray-800 dark:text-gray-100"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="subtitle"
              className="text-xl font-semibold block mb-2 text-gray-800 dark:text-gray-100"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="date"
                className="text-xl font-semibold block mb-2 text-gray-800 dark:text-gray-100"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="text-xl font-semibold block mb-2 text-gray-800 dark:text-gray-100"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="image"
              className="text-xl font-semibold block mb-2 text-gray-800 dark:text-gray-100"
            >
              Upload Image
            </label>
            <label
              htmlFor="image"
              className="cursor-pointer inline-block bg-violet-600 hover:bg-violet-800 transition duration-400 ease-linear text-white font-medium px-4 py-2 rounded-md"
            >
              Choose Image
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-contain rounded-md border mt-4"
                />
              </div>
            )}
          </div>

          <div>
            <label className="text-xl font-semibold block mb-2 text-gray-800 dark:text-gray-100">
              Body
            </label>
            <div className="border rounded-md p-3 dark:border-gray-600 dark:bg-gray-700">
              <FroalaEditor
                tag="textarea"
                model={formData.body}
                onModelChange={(content) =>
                  setFormData({ ...formData, body: content })
                }
                config={{
                  placeholderText: "Write your blog here...",
                  height: 400,
                  charCounterCount: true,
                  toolbarSticky: false,
                  theme: isDark ? "dark" : "gray", // Dynamically sets theme
                  toolbarButtons: {
                    moreText: {
                      buttons: [
                        "bold",
                        "italic",
                        "underline",
                        "strikeThrough",
                        "fontFamily",
                        "fontSize",
                      ],
                    },
                    moreParagraph: {
                      buttons: [
                        "alignLeft",
                        "alignCenter",
                        "alignRight",
                        "formatOL",
                        "formatUL",
                      ],
                    },
                    moreRich: {
                      buttons: [
                        "insertLink",
                        "insertImage",
                        "insertTable",
                        "insertHR",
                      ],
                    },
                    moreMisc: {
                      buttons: ["undo", "redo", "fullscreen"],
                    },
                    moreMisc2: {
                      buttons: ["clearFormatting", "selectAll", "html"],
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-800 transition duration-400 ease-linear active:bg-violet-900 text-white font-semibold text-lg rounded-md"
            >
              Publish <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Publish;
