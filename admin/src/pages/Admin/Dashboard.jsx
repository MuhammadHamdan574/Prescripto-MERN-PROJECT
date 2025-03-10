import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <img
              src={assets.doctor_icon}
              alt="Doctors"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-xl font-semibold">{dashData.doctors}</p>
              <p className="text-gray-600">Doctors</p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-xl font-semibold">{dashData.appointments}</p>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>
          <div className="flex items-center bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-xl font-semibold">{dashData.patients}</p>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
        </div>



        <div className="bg-white shadow-lg rounded-lg p-5 mt-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <img
              src={assets.list_icon}
              alt="Bookings"
              className="w-6 h-6 mr-2"
            />
            <p className="text-lg font-semibold text-gray-800">
              Latest Bookings
            </p>
          </div>

          {dashData.latestAppointments.length > 0 ? (
            <div className="space-y-4">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      className="rounded-full w-12 h-12 border border-gray-300"
                      src={item.docData.image}
                      alt={item.docData.name}
                    />
                    <div>
                      <p className="text-gray-800 font-medium">
                        {item.docData.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {slotDateFormat(item.slotDate)}
                      </p>
                    </div>
                  </div>

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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No latest bookings available.
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
