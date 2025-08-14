import { Router } from "express";
import Submission from "../models/Submission.js"; // 👈 Mongoose model

const router = Router();

// POST /api/submit → Add enquiry
router.post("/", async (req, res) => {
  try {
    const newSubmission = new Submission({
      ...req.body,
      submittedAt: new Date(),
    });

    await newSubmission.save();
    res.status(201).json({ message: "Enquiry saved successfully" });
  } catch (err) {
    console.error("Error saving submission:", err.message);
    res.status(500).json({ message: "Failed to save enquiry" });
  }
});
router.post("/other-package", async(req,res)=>{
  try {
    const newSubmission = new Submission({
      ...req.body,
      submittedAt: new Date(),
    });

    await newSubmission.save();
    res.status(201).json({ message: "Enquiry saved successfully",});
  } catch (err) {
    console.error("Error saving submission:", err.message);
    res.status(500).json({ message: "Failed to save enquiry" });
  }
})

export default router;
