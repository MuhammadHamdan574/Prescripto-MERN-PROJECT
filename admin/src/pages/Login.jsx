import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { data } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    debugger;
    event.preventDefault();
    try {
      if (state === "Admin") {
        const response = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        const { data } = response;

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          console.log("aToken is : ", data.token);
          setAToken(data.token);
          toast.success("Login Successful!"); // ✅ Show success message
        } else {
          toast.error(data.message || "Invalid Credentials!"); // ✅ Show error message if login fails
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        const { data } = response;
        console.log("My API gives : ", data);

        if (data.success) {
          localStorage.setItem("dToken", data.message);
          console.log("dToken is : ", data.message);
          setDToken(data.message);
          toast.success("Login Successful!"); // ✅ Show success message
        } else {
          toast.error(data.message || "Invalid Credentials!"); // ✅ Show error message if login fails
        }
      }
    } catch (error) {
      console.error("ERROR OCCURRED.........!", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex justify-center items-center  bg-gray-100 min-h-[80vh]"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <p className="text-2xl font-semibold text-gray-700 text-center mb-6">
          <span className="text-blue-500">{state}</span> Login
        </p>

        <div className="mb-4">
          <p className="text-gray-600 font-medium mb-1">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-600 font-medium mb-1">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Login
        </button>

        {state == "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="cursor-pointer text-blue-600 underline"
            >
              Click here
            </span>{" "}
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="cursor-pointer text-blue-600 underline"
            >
              Click here
            </span>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
