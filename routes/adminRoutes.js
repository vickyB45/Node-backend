import express from "express";
import jwt from "jsonwebtoken";
import Submission from "../models/Submission.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

const ADMIN_EMAIL = "admin@kashitrip.in";
const ADMIN_PASSWORD = "123456";
const JWT_SECRET = "vickysecret";

// 🔐 Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// 🔒 Protected route to get all submissions
router.get("/data", verifyAdmin, async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data from DB" });
  }
});

export default router;
