import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/submissions.json");


//add enquiry
router.post("/", (req, res) => {
  const newSubmission = {
    ...req.body,
    id: Date.now(),
    submittedAt: new Date().toISOString(),
  };
  
  console.log(req.body)
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Failed to read data" });

    let submissions = [];
    try {
      submissions = JSON.parse(data);
    } catch (e) {
      submissions = [];
    }

    submissions.push(newSubmission);

    fs.writeFile(dataPath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Failed to save data" });

      res.status(201).json({ message: "Enquiry saved successfully" });
    });
  });
});

export default router;
