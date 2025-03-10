import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            {/* Admin Routes */}
            {aToken && (
              <>
                <Route path="/" element={<></>} />
                <Route path="admin-dashboard" element={<Dashboard />} />
                <Route path="all-appointments" element={<AllAppointments />} />
                <Route path="add-doctor" element={<AddDoctor />} />
                <Route path="doctor-list" element={<DoctorsList />} />
              </>
            )}

            {/* Doctor Routes */}
            {dToken && (
              <>
                <Route path="doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="doctor-appointments" element={<DoctorAppointments />}/>
                <Route path="doctor-profile" element={<DoctorProfile />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
