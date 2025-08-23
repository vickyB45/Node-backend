import express from "express";
import Submission from "../models/Submission.js";
import nodemailer from "nodemailer";
const router = express.Router();


// 🔐 Admin login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
   
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

router.post("/send-mail", async (req, res) => {
  try {
    const user = { ...req.body };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tripskashi@gmail.com",
        pass: "zcbtxumarqxqutgc"
      }
    });

    let mailOptions = {
      from: `"Dev Deepawali" <${user.email}>`, // <-- alag email rakho
      to: "tripskashi@gmail.com",
      subject: `New message from Landing Page Dev-Deepawali. Name is - ${user.name}`,
      html: `
        <h2>New User Filled the Form </h2>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Message:</strong> ${user.message}</p>
        <hr>
        <p style="color: gray;">This email was sent automatically from your website form.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Mail sent successfully!" });

  } catch (error) {
    console.log("Error in Send Mail route", error.message);
    res.status(500).json({ message: "Server Error", err: error.message });
  }
});


export default router;
