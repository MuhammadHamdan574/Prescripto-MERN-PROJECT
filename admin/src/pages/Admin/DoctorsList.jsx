import { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="flex-grow p-6">
      <h1 className="text-2xl font-semibold mb-4">All Doctors</h1>

      {/* Flexbox with wrapping and responsive grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center border p-4 rounded-lg shadow-md w-full sm:w-[250px] mx-auto group cursor-pointer transition-transform transform hover:scale-105"
          >
            <img
              src={item.image}
              alt=""
              className="w-40 h-40 object-cover rounded-full bg-indigo-50 group-hover:bg-blue-600 transition-all duration-500"
            />
            <div className="text-center mt-2">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">{item.speciality}</p>
              <div className="flex items-center justify-center mt-2">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="mr-2"
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
