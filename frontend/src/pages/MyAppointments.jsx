import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [canceledAppointments, setCanceledAppointments] = useState([]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return `${dateArray[2]} ${months[parseInt(dateArray[1]) - 1]} ${
      dateArray[0]
    }`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      // const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments.reverse()); //Reverse the array to show the latest appointment first
        console.log("Appointments data gives  : ", data.appointments);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Fetching Appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      debugger;
      console.log("Appointment ID : ", appointmentId);
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId }, // Sending data in the body
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Cancelling Appointment");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b mb-5">
        My Appointments
      </p>

      <div className="space-y-6 mb-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 border p-4 rounded-lg shadow-md"
          >
            {/* Image Section - Fixed Width, Centered */}
            <div className="w-60 flex items-center">
              <img
                src={item.docData.image}
                alt="Doctor"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Doctor Details & Buttons */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Doctor Details - Centered */}
              <div className="space-y-2 flex flex-col justify-center">
                <p className="text-xl font-semibold">{item.docData.name}</p>
                <p className="text-gray-600">{item.docData.speciality}</p>
                <p className="font-semibold">Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p>
                  <span className="font-semibold">Date & Time : </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Buttons - Aligned to the Right */}
              <div className="flex justify-end gap-4 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Pay Online
                </button>
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
