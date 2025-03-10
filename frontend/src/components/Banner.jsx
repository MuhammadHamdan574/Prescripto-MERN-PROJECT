import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-[#5f6FFF] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex flex-col items-start text-white space-y-4">
        <div>
          <p className="ext-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            Book Appointment
          </p>
          <p className="ext-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            With 100+ Trusted Doctors
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="px-4 py-2 bg-white text-[#5f6FFF] rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Create Account
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 hidden md:flex justify-end relative">
        <img
          className=" max-w-md"
          src={assets.appointment_img}
          alt="Doctor Appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
