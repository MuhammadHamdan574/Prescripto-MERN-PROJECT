import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config(); // Load environment variables
// console.log("Loaded Environment Variables:", process.env); // Debugging

// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB(); // Connect to MongoDB
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/admin/", adminRouter);
app.use("/api/doctor/", doctorRouter);
app.use("/api/user/", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Start Server
app.listen(port, () => console.log("Server Started on port", port));
