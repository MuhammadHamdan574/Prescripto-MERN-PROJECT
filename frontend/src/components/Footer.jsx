import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-0 bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 px-5">
        {/* LEFT */}
        <div className="md:w-1/3 text-center md:text-left">
          <img src={assets.logo} alt="Logo" className="w-32 mx-auto md:mx-0" />
          <p className="text-sm text-gray-600 mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* MIDDLE */}
        <div className="md:w-1/3 text-center md:text-left">
          <p className="font-semibold text-lg">COMPANY</p>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="md:w-1/3 text-center md:text-left">
          <p className="font-semibold text-lg">GET IN TOUCH</p>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>hamdan878790@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT TEXT */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t pt-4">
        <p>Copyright 2025@ Prescripto - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer; 
