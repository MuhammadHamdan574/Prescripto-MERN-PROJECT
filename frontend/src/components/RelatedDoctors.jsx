import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id != docId
      );

      setRelDoc(doctorsData);
    }
  }, [doctors, docId, speciality]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors
      </p>

      <div className="w-full flex flex-wrap justify-center gap-4 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              // Debugger will trigger when clicking a doctor card
              console.log("Navigating to:", `/appointment/${item._id}`);
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-b-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-60"
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

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
