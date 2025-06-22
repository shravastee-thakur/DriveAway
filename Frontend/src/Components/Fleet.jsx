import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Fleet = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [carData, setCarData] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const Hatchback = carData.filter((car) => car.type === "Hatchback");
  const Sedan = carData.filter((car) => car.type === "Sedan");
  const Muv = carData.filter((car) => car.type === "MUV");
  const Suv = carData.filter((car) => car.type === "SUV");

  const data =
    tab === 2
      ? Hatchback
      : tab === 3
      ? Sedan
      : tab === 4
      ? Muv
      : tab === 5
      ? Suv
      : carData;

  const openModal = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const getCarData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/car/getAllCars"
        );

        if (res.data.success) {
          setCarData(res.data.allCars);
        }
      } catch (error) {
        console.error("Failed in getting data", error);
      }
    };

    getCarData();
  }, []);
  return (
    <>
      <section className="py-24 bg-[#E7F0DC] ">
        <h4 className="text-center font-semibold">
          Discover the DriveAways Fleet
        </h4>
        <h1 className="text-center text-3xl md:text-4xl font-bold mt-2 text-sky-800">
          Our Rental Fleets
        </h1>

        <div className="flex flex-wrap gap-3 md:gap-8 justify-center items-center mt-8">
          <div
            className="cursor-pointer font-semibold"
            style={{ borderBottom: tab === 1 ? "2px solid red" : "white" }}
            onClick={() => setTab(1)}
          >
            Show All
          </div>
          <div
            className="cursor-pointer font-semibold"
            style={{ borderBottom: tab === 2 ? "2px solid red" : "white" }}
            onClick={() => setTab(2)}
          >
            Hatchback
          </div>
          <div
            className="cursor-pointer font-semibold"
            style={{ borderBottom: tab === 3 ? "2px solid red" : "white" }}
            onClick={() => setTab(3)}
          >
            Sedan
          </div>
          <div
            className="cursor-pointer font-semibold"
            style={{ borderBottom: tab === 4 ? "2px solid red" : "white" }}
            onClick={() => setTab(4)}
          >
            MUV
          </div>
          <div
            className="cursor-pointer font-semibold"
            style={{ borderBottom: tab === 5 ? "2px solid red" : "white" }}
            onClick={() => setTab(5)}
          >
            SUV
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:px-20">
          {data &&
            data.map((car) => (
              <div
                key={car._id}
                className="hover:border border-blue-400 bg-white  transition ease-in-out delay-150 w-full"
              >
                <img src={car.carImage} className="w-full object-cover" />
                <h1 className="text-2xl font-bold text-red-800 text-center">
                  {car.modelName}
                </h1>
                <p className="text-blue-900 font-bold text-center">
                  ₹ {car.pricePerDay.toLocaleString()} /- per day
                </p>
                <div className="flex justify-around mt-4 pb-2">
                  <button
                    onClick={() => navigate(`/carDetails/${car._id}`)}
                    className="bg-orange-600 hover:bg-red-600 rounded-md py-1 px-6 sm:px-8 font-semibold text-white"
                  >
                    Rent
                  </button>
                  <button
                    onClick={() => openModal(car)}
                    className="bg-orange-400 hover:bg-orange-500 rounded-md py-1 px-6 sm:px-8 font-semibold text-white"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
        </div>

        {isModalOpen && selectedCar && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-center mb-3 text-red-700">
                Car Details
              </h2>
              <p className="mb-2">
                <span className="font-semibold">Car</span>:{" "}
                {selectedCar.modelName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Rate per day</span>: ₹
                {selectedCar.pricePerDay}/-
              </p>
              <p className="mb-2">
                <span className="font-semibold">Capacity</span>:{" "}
                {selectedCar.seatCapacity}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Fuel</span>:{" "}
                {selectedCar.fuelType}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Type</span>: {selectedCar.type}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Transmission</span>:{" "}
                {selectedCar.transmission}
              </p>
              <div className="flex justify-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Fleet;
