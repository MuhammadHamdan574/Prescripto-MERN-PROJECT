import { useState,useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log("Token state changed:", token);
  }, [token]);

  return (
    <div className="flex item-center justify-between text-sm mb-5 p-4 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-44 cursor-pointer"
      />
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:font-bold hover:text-[#5f6FFF]">HOME</li>
          <hr className="border_none outline-none bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 hover:font-bold hover:text-[#5f6FFF]">
            ALL DOCTORS
          </li>
          <hr className="border_none outline-none bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 hover:font-bold hover:text-[#5f6FFF]">ABOUT</li>
          <hr className="border_none outline-none bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 hover:font-bold hover:text-[#5f6FFF]">CONTACT</li>
          <hr className="border_none outline-none bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={userData.image} alt="" className="w-8 rounded-full" />
            <img src={assets.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-light text-gray-600 z-20 hidden group-hover:block">
              <div className="min w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="text-black cursor-pointer hover:font-bold"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="text-black cursor-pointer hover:font-bold"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout} // ✅ Call function directly
                  className="text-black cursor-pointer hover:font-bold"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className=" bg-[#5f6FFF] p-3 px-8 text-white rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />


        <div>
          <div>
            <img src={assets.logo} alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          <ul>
            <NavLink> Home</NavLink>
            <NavLink> All DOCTORS</NavLink>
            <NavLink> ABOUT</NavLink>
            <NavLink> CONTACT</NavLink>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
