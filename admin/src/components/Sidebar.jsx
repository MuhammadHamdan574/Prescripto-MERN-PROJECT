import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="bg-white border-r text-gray-700 w-64 min-h-screen p-6 flex-shrink-0">
      {aToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-6 h-6" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.add_icon} alt="" className="w-6 h-6" />
              <p>Add Doctor</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.people_icon} alt="" className="w-6 h-6" />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}

      {dToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-6 h-6" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-lg transition ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <img src={assets.people_icon} alt="" className="w-6 h-6" />
              <p>Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
