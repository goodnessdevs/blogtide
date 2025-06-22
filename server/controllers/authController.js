import bcryptjs from "bcryptjs";
import crypto from "crypto";
import validator from "validator";
import { generateToken } from "../utils/generateToken.js";
import User from "../models/authModel.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendAccountDeletionEmail,
} from "../emails/email.js";
import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(401)
        .json({ success: false, error: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, error: "Email is not valid" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        error:
          "Password is weak! It must contain at least 8 characters having an uppercase, a lowercase, a number and a special character",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Passwords do not match. Please try again",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = crypto.randomInt(100000, 999999).toString();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiredAt: new Date(Date.now() + 1000 * 60 * 10), // 10 min
    });

    console.log("Request body:", req.body);
    console.log("Request path:", req.path);

    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "Production",
    });

    await sendVerificationEmail(user.username, user.email, verificationToken);

    delete user._doc.password; // Remove password from response

    res.status(200).json({
      user: user._doc,
      token,
    });
  } catch (error) {
    console.log("Error signing user", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  if (!code || code.length !== 6) {
    return res.status(400).json({
      success: false,
      message: "Invalid verification code format.",
    });
  }

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiredAt = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "Production",
    });

    await sendWelcomeEmail(user.email, user.username);

    delete user._doc.password; // Remove password from response

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: user._doc,
      token,
    });
  } catch (error) {
    console.log("Error verifying user", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Email is not valid" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email" });
    }

    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    console.log("Request body:", req.body);
    console.log("Request path:", req.path);

    const token = generateToken(user._id);

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "Production",
    });

    user.lastLogin = new Date();
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiredAt = undefined;
    await user.save();

    delete user._doc.password;
    delete user._doc.verificationToken;
    delete user._doc.verificationTokenExpiredAt;

    res.status(200).json({
      user: user._doc,
      token,
    });
  } catch (error) {
    console.log("Error logging in user", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.clearCookie("token");

    await sendAccountDeletionEmail(
      user.email,
      user.username
    );

    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.log("Error deleting user", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash token before saving
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordTokenExpiredAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    await user.save();

    // Send reset password email
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    console.log("Error sending reset password email", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || !password) {
    return res
      .status(400)
      .json({ error: "Token and new password are required" });
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Reset token from URL:", token);
    console.log("Hashed token:", hashedToken);

    // For debugging: show all users with a resetPasswordToken
    const usersWithToken = await User.find({ resetPasswordToken: { $exists: true, $ne: null } });
    console.log("Users with resetPasswordToken:", usersWithToken.map(u => ({ email: u.email, resetPasswordToken: u.resetPasswordToken, resetPasswordTokenExpiredAt: u.resetPasswordTokenExpiredAt })));

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiredAt = undefined;
    await user.save();

    await sendResetPasswordSuccessEmail(
      user.email,
      user.username
    );

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error resetting password", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
