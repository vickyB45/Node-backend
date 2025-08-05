import express from "express";
import cors from "cors";
import enquiryRoute from "./routes/enquiry.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/enquiry", enquiryRoute);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
