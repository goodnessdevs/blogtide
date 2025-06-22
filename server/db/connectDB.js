import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    // await mongoose.connection.collection("users").dropIndex("username_1");
    console.log(`MongoDB connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.log("Error connection to MONGODB: ", "❌", error);
    process.exit(1);
  }
};
