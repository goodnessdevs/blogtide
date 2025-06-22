import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import {
  ACCOUNT_DELETION_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devswithgoody82@gmail.com",
    pass: process.env.EMAIL_PASSWORD, // Use environment variable for security
  },
});

export const sendVerificationEmail = async (username, email, verificationToken) => {
  try {
    const mailOptions = {
      from: "devswithgoody82@gmail.com",
      to: email,
      subject: "Email Verification",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{code}",
        verificationToken
      ).replace(
        "{username}",
        username
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending verification email: ", error);
  }
};

export const sendWelcomeEmail = async (email, username) => {

  try {
    const mailOptions = {
      from: "devswithgoody82@gmail.com",
      to: email,
      subject: "Welcome",
      html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username).replace(
        "{clientURL}",
        process.env.CLIENT_URL
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending welcome email: ", error);
  }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: "devswithgoody82@gmail.com",
      to: email,
      subject: "Password Reset",
      html: PASSWORD_RESET_EMAIL_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ).replace(
        "{email}",
        email
      ).replace(
        "{clientURL}",
        process.env.CLIENT_URL
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending password reset email: ", error);
  }
};

export const sendResetPasswordSuccessEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: "devswithgoody82@gmail.com",
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE.replace(
        "{username}",
        username
      ).replace(
        "{email}",
        email
      ).replace(
        "{clientURL}",
        process.env.CLIENT_URL
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending password reset success email: ", error);
  }
};

export const sendAccountDeletionEmail = async (email, username) => {
  try {
    const mailOptions = {
      from: "devswithgoody82@gmail.com",
      to: email,
      subject: "Account Deletion Confirmation",
      html: ACCOUNT_DELETION_EMAIL_TEMPLATE.replace(
        "{username}",
        username
      ).replace(
        "{clientURL}",
        process.env.CLIENT_URL
      ),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("An error occured while sending account deletion email: ", error);
  }
};