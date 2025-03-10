import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console log formdata

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor has Added");
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      }
    } catch (error) {
      toast.error("Doctor wasn't Added");
      console.log("Error gives :", error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-5 w-full bg-white p-6 rounded-lg shadow-md"
    >
      <p className="mb-5 text-2xl font-semibold text-gray-700">Add Doctor</p>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
            <p className="text-gray-600 text-sm mt-2">Upload doctor picture</p>
          </div>

          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Doctor Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Doctor Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Doctor Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-gray-700 font-medium">Experience</label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`${i + 1} Year`}>{`${
                  i + 1
                } Year`}</option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div>
            <label className="text-gray-700 font-medium">Fees</label>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          {/* Speciality */}
          <div>
            <label className="text-gray-700 font-medium">Speciality</label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="text-gray-700 font-medium">Education</label>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-700 font-medium">Address</label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="w-full p-2 border rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* About Doctor */}
          <div>
            <label className="text-gray-700 font-medium">About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              placeholder="Write about doctor..."
              rows={5}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
