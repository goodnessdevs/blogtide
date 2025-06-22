import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/authModel.js";
dotenv.config();

export const requireAuth = async (req, res, next) => {
  if (req.user) {
    return next();
  }

  // verify token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    console.log('Auth header:', req.headers.authorization);

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
