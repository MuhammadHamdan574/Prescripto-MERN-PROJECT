import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState({});

  const getAppointments = async () => {
    try {
      console.log("Sending Token:", dToken); // ✅ Log before request
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
        console.log("Appointments data:", data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error occurred!");
      console.log("Error gives:", error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      console.log("API Response:", data);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error occurred!");
      console.log("Error gives:", error);
    }
  };

  const cancelAppointment = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );

      console.log("API Response:", data);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error occurred!");
      console.log("Error gives:", error);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });

      console.log("API Response:", data);

      if (data.success) {
        setDashData(data.message);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error gives:", error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      debugger;
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });

      if (data.success) {
        setProfileData(data.message);
        console.log("Profile Data gives : ", profileData);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error gives:", error);
      toast.error(error.message);
    }
  };

  const updateProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/update-profile",
        {
          headers: { dToken },
        }
      );

      console.log("API Response:", data);

      if (data.success) {
        setProfileData(data.profileData);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error gives:", error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    getAppointments,
    appointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    setProfileData,
    profileData,
    updateProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
