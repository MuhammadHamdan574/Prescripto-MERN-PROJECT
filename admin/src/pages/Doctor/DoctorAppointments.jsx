import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets"; // Ensure you import assets properly

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        All Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 uppercase text-sm font-semibold">
              <th className="border border-gray-300 px-4 py-3">#</th>
              <th className="border border-gray-300 px-4 py-3">Patient</th>
              <th className="border border-gray-300 px-4 py-3">Payment</th>
              <th className="border border-gray-300 px-4 py-3">Age</th>
              <th className="border border-gray-300 px-4 py-3">Date & Time</th>
              <th className="border border-gray-300 px-4 py-3">Fees</th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((item, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-center"
                >
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={item.userData.image}
                      alt="Patient"
                      className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                    />
                    <span className="font-medium">{item.userData.name}</span>
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {item.payment ? (
                      <span className="text-green-600">Online</span>
                    ) : (
                      <span className="text-red-500">Cash</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {calculateAge(item.userData.dob)}
                  </td>

                  <td className="px-4 py-3">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {currency}
                    {item.amount}
                  </td>

                  {item.cancelled ? (
                    <td className="px-2 py-1 text-center text-sm font-medium text-red-500 bg-gray-100 rounded-md">
                      Cancelled
                    </td>
                  ) : item.isCompleted ? (
                    <td className="px-2 py-1 text-center text-sm font-medium text-green-600 bg-gray-100 rounded-md">
                      Completed
                    </td>
                  ) : (
                    <td className="px-2 py-1 flex flex-col sm:flex-row justify-center items-center gap-2">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Reject"
                        className="w-7 h-7 cursor-pointer transition-all transform hover:scale-110 hover:opacity-80"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Approve"
                        className="w-7 h-7 cursor-pointer transition-all transform hover:scale-110 hover:opacity-80"
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-lg"
                >
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
