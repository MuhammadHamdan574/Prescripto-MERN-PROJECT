import validator from "validator";
import bcrpt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Checking for all data to add Doctor

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, messsage: "Missing Details" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        messsage: "Please enter a valid Email",
      });
    }

    // Validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        messsage: "Please enter a strong password",
      });
    }

    // Hashing doctor password

    const salt = await bcrpt.genSalt(10);
    const hashedPassword = await bcrpt.hash(password, salt);

    // Upload image to Cloudinary

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_image: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return res.json({
      success: true,
      messsage: "Doctor has been Added",
    });
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

// API for admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, messsage: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

//API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

//API to get all appointments for admin panel

const appointmentsAdmin = async (req, res) => {
  try {
    debugger;
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

//API for appoint cancellation

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndDelete(appointmentId);

    //release slot in doctor data
    const { docId, slotDate, slotTime } = appointment;
    const docData = await doctorModel.findById(docId).select("-password");
    let slots_booked = docData.slots_booked;

    const index = slots_booked[slotDate].indexOf(slotTime);
    slots_booked[slotDate].splice(index, 1);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured now" });
  }
};

//API to get Dashboard data for Admin panel

const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, message: dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured now" });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
