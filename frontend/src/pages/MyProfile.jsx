import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      //Independent
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded " src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-65 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

          <div className="p-4 space-y-4">
            {/* Email ID */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">Email ID:</p>
              <p className="text-blue-400">{userData.email}</p>
            </div>

            {/* Phone */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  className="border p-2 w-1/2 rounded-md "
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-blue-400">{userData.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex justify-between items-start">
              <p className="font-semibold">Address:</p>
              {isEdit ? (
                <div className="w-1/2">
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    type="text"
                    className="border p-2 w-full rounded-md mb-2 text-center bg-gray-50"
                    value={userData.address.line1}
                  />
                  <input
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    type="text"
                    className="border p-2 w-full rounded-md bg-gray-50"
                    value={userData.address.line2}
                  />
                </div>
              ) : (
                <div className="w-1/6 text-center ml-60 text-gray-500">
                  <p className="font-semibold">{userData.address.line1}</p>
                  <p className="font-semibold">{userData.address.line2}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <p className="text-neutral-500 underline mt-3 mb-3.5">
            BASIC INFORMATION
          </p>

          <div className="space-y-3">
            {/* Gender */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">Gender:</p>
              {isEdit ? (
                <select
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                  className="border rounded-md p-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className="text-right">{userData.gender}</p>
              )}
            </div>

            {/* Birthday */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">Birthday:</p>
              {isEdit ? (
                <input
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob}
                  className="border rounded-md p-2"
                />
              ) : (
                <p className="text-right">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 mx-0 mb-4">
          {isEdit ? (
            <button
              className="border border-blue-600 px-8 py-2 rounded-full text-gray-700 
      hover:bg-[#5f6FFF] hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-blue-600 px-8 py-2 rounded-full text-gray-700
      hover:bg-[#5f6FFF] hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
