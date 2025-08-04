import express from "express"
import cors from "cors"
import enquiryRoute from "./routes/enquiry.js"
import adminRoutes from "./routes/adminRoutes.js"
import cookieParser from "cookie-parser";


const app= express()
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever your frontend port is
    credentials: true, // ⭐️ allows cookies
  })
);
app.use(express.json())
app.use(cookieParser());


app.use("/api/enquiry",enquiryRoute)
app.use("/api/admin", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});