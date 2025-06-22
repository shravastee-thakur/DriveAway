import "remixicon/fonts/remixicon.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import CarUpload from "./Pages/CarUpload";
import CarDetails from "./Pages/CarDetails";

const App = () => {
  return (
    <div className="h-full w-full ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addcar" element={<CarUpload />} />
          <Route path="/carDetails/:carId" element={<CarDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
