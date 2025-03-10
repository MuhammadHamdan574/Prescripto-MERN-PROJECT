import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <div className="flex justify-between items-center border-b bg-white shadow-md p-4 rounded-md">
      <div className="flex items-center space-x-3">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-50 object-contain"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
