import mongoose from "mongoose";
import Blog from "../models/blogModel.js";

export const getAblog = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "No such blog" });
    }
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(400).json({ success: false, message: "No such blog" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.log("Error getting blog", error);
    return res.status(500).json({ success: false, message: "Internal server errror" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    if (!blogs) {
      return res
        .status(400)
        .json({ success: false, message: "Blogs not found" });
    }

    return res.status(200).json(blogs);
  } catch (error) {
    console.log("Error getting blogs", error);
    return res.status(500).json({ success: false, message: "Internal server errror" });
  }
};

export const createBlog = async (req, res) => {
  const { title, subtitle, date, author, body } = req.body;
  const imageUrl = req.file ? "/uploads/" + req.file.filename : "";

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    const requiredFields = { title, date, author, body };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        throw new Error(`${key} is required`);
      }
    }

    const newBlog = new Blog({
      title,
      subtitle,
      date,
      author,
      image: imageUrl,
      body,
    });

    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog successfully created",
      Blog: {
        ...newBlog._doc,
      },
    });
  } catch (error) {
    console.log("Error creating blog", error);
    return res.status(500).json({ success: false, message: "Internal server errror" });
  }
};

export const updateBlog = async (req, res) => {
  const { title, subtitle, date, author, image, body } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  const updateFields = { title, subtitle, date, author, image, body };
  if (imageUrl) updateFields.image = imageUrl;

  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "No such blog" });
    }

    const editedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!editedBlog) {
      return res.status(400).json({ success: false, message: "No such blog" });
    }

    return res.status(200).json(editedBlog);
  } catch (error) {
    console.log("Error editng blog", error);
    return res.status(500).json({ success: false, message: "Internal server errror" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid({ id })) {
      return res.status(404).json({ success: false, message: "No such blog" });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(400).json({ success: false, message: "No such blog" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.log("Error deleting blog", error);
    return res.status(500).json({ success: false, message: "Internal server errror" });
  }
};
