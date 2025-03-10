import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log("Doctors data gives : ", data.doctors);
      }
    } catch (error) {
      toast.error("Error occured!");
      console.log("Error gives :", error);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Availability Changed");
        getAllDoctors();
        console.log("Doctors data gives : ", data.doctors);
      }
    } catch (error) {
      toast.error("Error occured!");
      console.log("Error gives :", error);
    }
  };

  const getAllAppointments = async () => {
    try {
      debugger;
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        console.log("Doctors data gives : ", data.appointments);
      } else {
        toast.error("No appointments found");
      }
    } catch (error) {
      toast.error("Error occured!");
      console.log("Error gives :", error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error occured!");
      console.log("Error gives :", error);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
  
      if (data.success) {
        toast.success("Dashboard data fetched successfully!");
        setDashData(data.message); // ✅ FIXED: Set dashData from `data.message`
        console.log("DashData received:", data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error occurred while fetching dashboard data!");
      console.log("Error:", error);
    }
  };
  

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
