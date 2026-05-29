import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash("123456", salt);
const aiUser = {
  fullName: "Chatty AI",
  email: "chattyai@bot.com",
  password: hashedPassword,
  profilePic:
    "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
};

const existingUser = await User.findOne({
  email: aiUser.email,
});

if (!existingUser) {
  await User.create(aiUser);
  console.log("AI User Created");
} else {
  console.log("AI User Already Exists");
}

process.exit();