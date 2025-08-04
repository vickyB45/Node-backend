import { Router } from "express";
import jwt from "jsonwebtoken";


import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { verifyAdmin } from "../middleware/auth.js";

const router = Router();

const ADMIN_EMAIL = "admin@kashitrip.in";
const ADMIN_PASSWORD = "123456";
const JWT_SECRET = "vickysecret"; // ideally use env

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // true in production with https
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/submissions.json");

// GET /api/admin/data
router.get("/data", verifyAdmin, (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    try {
      const submissions = JSON.parse(data);
      res.status(200).json(submissions);
    } catch (e) {
      res.status(500).json({ message: "Invalid JSON format" });
    }
  });
});

export default router   