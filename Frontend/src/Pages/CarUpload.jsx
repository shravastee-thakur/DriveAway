import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const CarUpload = () => {
  const { accessToken } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    modelName: "",
    pricePerDay: "",
    seatCapacity: "",
    fuelType: "",
    type: "",
    transmission: "",
    carImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: type === "file" ? files[0] : value,
      };
      console.log(updatedForm);
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/car/createCar",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        // setFormData(res.data.car);
        alert(res.data.message);
        setFormData({
          modelName: "",
          pricePerDay: "",
          seatCapacity: "",
          fuelType: "",
          type: "",
          transmission: "",
          carImage: null,
        });
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Upload failed");
    }
  };

  return (
    <div className="w-fit mx-auto p-6 bg-[#E7F0DC] rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Upload Car Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-10 justify-between">
          <input
            name="modelName"
            onChange={handleChange}
            value={formData.modelName}
            required
            placeholder="Model Name"
            className="border p-2 rounded-lg bg-white"
          />
          <input
            name="pricePerDay"
            onChange={handleChange}
            type="number"
            value={formData.pricePerDay}
            required
            placeholder="Price Per Day"
            className="border p-2 rounded-lg bg-white"
          />
        </div>

        <div className="flex justify-between">
          <input
            name="seatCapacity"
            onChange={handleChange}
            value={formData.seatCapacity}
            type="number"
            required
            placeholder="Seat Capacity"
            className="border p-2 rounded-lg bg-white"
          />
          <input
            name="fuelType"
            onChange={handleChange}
            value={formData.fuelType}
            required
            placeholder="Fuel Type"
            className="border p-2 rounded-lg bg-white"
          />
        </div>

        <div className="flex gap-5 justify-between">
          <select
            name="type"
            onChange={handleChange}
            value={formData.type}
            required
            className="border p-2 rounded-lg bg-white"
          >
            <option value="">Select Car Type</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Sedan">Sedan</option>
            <option value="MUV">MUV</option>
            <option value="SUV">SUV</option>
          </select>

          <select
            name="transmission"
            onChange={handleChange}
            value={formData.transmission}
            required
            className="border p-2 rounded-lg bg-white"
          >
            <option value="">Select Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Car Image</label>
          <input
            ref={fileInputRef}
            type="file"
            name="carImage"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-md bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-red-700 text-white py-2 rounded-md  transition"
        >
          Upload Car
        </button>
      </form>
    </div>
  );
};

export default CarUpload;
