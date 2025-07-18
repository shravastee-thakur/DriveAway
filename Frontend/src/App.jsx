import "remixicon/fonts/remixicon.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import CarUpload from "./Pages/CarUpload";
import CarDetails from "./Pages/CarDetails";
import Admin from "./Pages/Admin";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import MyBooking from "./Pages/MyBooking";
import AllBooking from "./Pages/AllBooking";

const App = () => {
  const { accessToken, role } = useContext(AuthContext);
  return (
    <div className="h-full w-full ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/carDetails/:carId" element={<CarDetails />} />
          </>

          {accessToken && (
            <>
              <Route path="/myBooking" element={<MyBooking />} />
            </>
          )}

          {role === "admin" && (
            <>
              <Route path="/addcar" element={<CarUpload />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/allBooking" element={<AllBooking />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
