import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
//API to register User

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Enter a valid Email" });
    }

    if (password.length < 8) {
      res.json({ success: false, message: "Enter a strong Password" });
    }

    //Hashing User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    //Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to login User

const loginUser = async (req, res) => {
  try {
    debugger;
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (isMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user Profile data

const getProfile = async (req, res) => {
  try {
    debugger;
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured now" });
  }
};

//API to update user Profile data

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Check if required fields are missing
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    // Update user details
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: address ? JSON.parse(address) : null, // Ensure parsing only if address exists
      dob,
      gender,
    });

    // If image is provided, upload to Cloudinary
    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });

        await userModel.findByIdAndUpdate(userId, {
          image: imageUpload.secure_url,
        });
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.json({ success: false, message: "Image Upload Failed" });
      }
    }

    // Send response after all operations are done
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error occurred" });
  }
};

//API to book Appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    //Get doctors data
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    //Checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    //Get users data
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    //Save new slots data in docData

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured now" });
  }
};

//API to get user appointments for frontend my-appointments page

const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occured now" });
  }
};

//API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId != userId) {
      return res.json({ success: false, message: "Not Authorized" });
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






export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
