import { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    debugger;
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-4 text-xl font-semibold text-gray-800">
        All Appointments
      </p>

      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Age</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.userData.image}
                    alt="Patient"
                  />
                  <span>{item.userData.name}</span>
                </td>
                <td className="p-3">{calculateAge(item.userData.dob)}</td>
                <td className="p-3">
                  {slotDateFormat(item.slotDate)} , {item.slotTime}
                </td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.docData.image}
                    alt="Doctor"
                  />
                  <span>{item.docData.name}</span>
                </td>
                <td className="p-3">
                  {currency}
                  {item.docData.fees}
                </td>

                {item.cancelled ? (
                  <span className="text-red-400 font-semibold text-sm hover:cursor-pointer hover:text-red-500 hover:text-[15px]">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <p className="text-green-400 font-semibold text-sm hover:cursor-pointer hover:text-green-500 hover:text-[15px]">Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancelled"
                    className="w-6 h-6 mx-auto opacity-80 hover:opacity-100 transition-opacity "
                  />
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
