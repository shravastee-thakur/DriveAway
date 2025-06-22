import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BookingContext } from "../Context/BookingProvider";
import { AuthContext } from "../Context/AuthProvider";

const CarDetails = () => {
  const { bookingInfo } = useContext(BookingContext);
  const { accessToken } = useContext(AuthContext);

  const { carId } = useParams();
  const [car, setCar] = useState(null);
  //   const navigate = useNavigate();

  useEffect(() => {
    const getCarById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/car/getCarById/${carId}`
        );

        if (res.data.success) {
          setCar(res.data.car);
        }
      } catch (error) {
        console.error("Failed to fetch car", error);
      }
    };

    getCarById();
  }, [carId]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingInfo.startDate || !bookingInfo.endDate) {
      alert("Please select start and end dates first.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/booking/createBooking",
        {
          car: carId,
          ...bookingInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
      if (res.data.success) {
        alert("Booking successful!");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Booking failed.");
    }
  };

  if (!car) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="px-6 py-10">
      <div className="flex flex-col md:flex md:flex-row  justify-center items-center gap-10">
        {/* image */}
        <div>
          <img
            src={car.carImage}
            alt={car.modelName}
            className="w-full  rounded-md"
          />
        </div>

        {/* detail */}
        <div>
          <h2 className="text-3xl font-bold text-center mt-4 text-sky-800">
            {car.modelName}
          </h2>
          <p className="text-center text-xl font-semibold text-gray-700 mb-4">
            ₹ {car.pricePerDay.toLocaleString()} /- per day
          </p>
          <div className="space-y-2 text-lg text-gray-800">
            <p>
              <strong>Seats:</strong> {car.seatCapacity}
            </p>
            <p>
              <strong>Fuel Type:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Transmission:</strong> {car.transmission}
            </p>
            <p>
              <strong>Type:</strong> {car.type}
            </p>
            <p>
              <strong>Pick up location:</strong> {bookingInfo.pickupLocation}
            </p>
            <p>
              <strong>Drop location:</strong> {bookingInfo.dropLocation}
            </p>
            <p>
              <strong>Start Date:</strong> {bookingInfo.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {bookingInfo.endDate}
            </p>

            <button
              onClick={handleBooking}
              className="bg-orange-600 hover:bg-red-600 rounded-md py-1 px-6 sm:px-8 font-semibold text-white"
            >
              Book now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
