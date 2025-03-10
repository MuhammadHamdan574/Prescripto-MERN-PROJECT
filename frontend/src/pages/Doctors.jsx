import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="flex gap-8 p-5">
      {/* Left Side - Specialties List */}
      <div className="w-1/5 p-4 border-gray-300">
        <div className="mt-4 space-y-3">
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`cursor-pointer hover:text-blue-500 border border-gray-300 px-6 py-3 w-full text-center transition-all ${
              speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`cursor-pointer hover:text-blue-500 border border-gray-300 px-6 py-3 w-full text-center transition-all ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`cursor-pointer hover:text-blue-500 border border-gray-300 px-6 py-3 w-full text-center transition-all ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`cursor-pointer hover:text-blue-500 border border-gray-300 px-6 py-3 w-full text-center transition-all ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`cursor-pointer hover:text-blue-500 border border-gray-300 px-6 py-3 w-full text-center transition-all ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`cursor-pointer hover:text-blue-500 border border-gray-300 px-6 py-3 w-full text-center transition-all ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>
      </div>

      {/* Right Side - Doctors List */}
      <div className="flex-1">
        <div className="grid grid-cols-4 gap-4">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-full"
            >
              <img
                className="bg-blue-50 w-full h-45 object-cover"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-gray-500"
                  } `}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"} </p>
                </div>

                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
