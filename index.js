import express from "express"
import cors from "cors"
import enquiryRoute from "./routes/enquiry.js"
import adminRoutes from "./routes/adminRoutes.js"
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";


const app= express()
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-gold-beta-55.vercel.app", // ✅ your Vercel frontend domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false, // ❌ cookies not used anymore
  })
);
app.use(express.json())
app.use(cookieParser());


connectDB();

app.use("/api/enquiry",enquiryRoute)
app.use("/api/admin", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});