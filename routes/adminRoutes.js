import express from "express";
import jwt from "jsonwebtoken";
import Submission from "../models/Submission.js";

const router = express.Router();

const ADMIN_EMAIL = "admin@kashitrip.in";
const ADMIN_PASSWORD = "123456";
const JWT_SECRET = "vickysecret";

// 🔐 Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
   
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// 🔒 Protected route to get all submissions
router.get("/data", async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data from DB" });
  }
});

export default router;
