import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {
  getUsers,
  signup,
  login,
  logout,
  deleteUser,
  verifyEmail, 
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logout);
router.delete("/:id", deleteUser);

export default router;
