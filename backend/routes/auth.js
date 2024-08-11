import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import verifyUser from '../middlewares/auth.js'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "Signup success" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ status: false, message: "User is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ status: false, message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  return res.json({ status: true, token, message: "Login successful" });
});

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

router.get('/logout', (req, res) => {
  return res.json({ status: true, message: "Logout successful" });
});

export { router as authRouter };
