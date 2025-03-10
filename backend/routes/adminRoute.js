import express from "express";
import {
  addDoctor,
  adminDashboard,
  allDoctors,
  appointmentCancel,
  appointmentsAdmin,
  loginAdmin,
} from "../controllers/adminController.js"; // Ensure correct file extension (.js)
import upload from "../middlewares/multer.js"; // Ensure correct file extension (.js)
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// Endpoints
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor); // Fixed route path
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
export default adminRouter;
