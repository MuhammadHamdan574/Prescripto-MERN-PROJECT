import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

//API for change Availability

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Availability Changeed" });
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

//API for doctorsList

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

//API for doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        messsage: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: token, // ✅ Corrected key
      });
    } else {
      return res.json({
        success: false,
        messsage: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

//API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.json({ success: false, message: "Doctor ID is missing" });
    }

    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log("Error gives:", error);
    return res.json({ success: false, message: error.message });
  }
};

//API to mark appointment completed

const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body; // docId comes from authDoctor

    const appointmentData = await appointmentModel.findById(appointmentId);

    console.log("Fetched Appointment Data:", appointmentData);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentData._id, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({
        success: false,
        message: "Mark Failed - Unauthorized",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//API to cancel appointment for doctor panel

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body; // docId comes from authDoctor

    const appointmentData = await appointmentModel.findById(appointmentId);

    console.log("Fetched Appointment Data:", appointmentData);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentData._id, {
        cancelled: true,
      });

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({
        success: false,
        message: "Cancellation Failed - Unauthorized",
      });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//API to get Dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patients = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
      patients.add(item.userId);
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.size,
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    res.json({ success: true, message: dashData });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

//API to get doctor profile for Doctor Panel

const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.json({ success: true, message: profileData });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

//API to update doctor profile data from Doctor Panel

const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      fees,
      address,
      available,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
