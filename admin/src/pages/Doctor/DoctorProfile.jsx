import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      console.log("API Response:", data);

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error gives:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Doctor Name */}
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {profileData.name}
            </h2>
            <p className="text-gray-500">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="mt-2 px-4 py-1 text-sm font-medium bg-blue-500 text-white rounded-lg shadow-md">
              {profileData.experience} Years Experience
            </button>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700">About</h3>
            <p className="text-gray-600 mt-1">{profileData.about}</p>
          </div>

          {/* Appointment Fee */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-700 font-medium">Appointment Fee:</p>
            <span className="text-blue-600 font-semibold">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={profileData.fees}
                />
              ) : (
                profileData.fees
              )}
            </span>
          </div>

          {/* Address */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Address:</h3>
            <p className="text-gray-600">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                />
              ) : (
                profileData?.address?.line1 || "No address available"
              )}
            </p>
            {isEdit ? (
              <input
                type="text"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={profileData.address.line2}
              />
            ) : (
              profileData?.address?.line2 || "No address available"
            )}
          </div>

          {/* Availability Checkbox */}
          <div className="mt-4 flex items-center">
            <input
              onChange={() =>
                isEdit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              type="checkbox"
              checked={profileData.available}
              id="availability"
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="availability" className="ml-2 text-gray-700">
              Available
            </label>
          </div>

          {/* Edit Button */}
          <div className="mt-6 text-center">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
