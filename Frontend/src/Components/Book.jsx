import { useState, useEffect, useContext } from "react";
import { BookingContext } from "../Context/BookingProvider";

const Book = () => {
  const { bookingInfo, setBookingInfo } = useContext(BookingContext);

  const [startDate, setStartDate] = useState(bookingInfo.startDate || "");
  const [endDate, setEndDate] = useState(bookingInfo.endDate || "");
  const [pickup, setPickup] = useState(bookingInfo.pickupLocation || "");
  const [drop, setDrop] = useState(bookingInfo.dropLocation || "");

  useEffect(() => {
    setBookingInfo({
      startDate,
      endDate,
      pickupLocation: pickup,
      dropLocation: drop,
    });
  }, [startDate, endDate, pickup, drop]);

  return (
    <section className="bg-[#009990] py-14">
      <div className="bg-[#E1FFBB] px-10 py-6 h-auto w-10/12 mx-auto rounded-lg border-2 border-white lg:mx-auto lg:w-11/12 lg:rounded-lg lg:border-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <label className="md:text-lg">Pick-up</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="text"
              placeholder="Enter location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="md:text-lg">Drop-off</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="text"
              placeholder="Enter location"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="md:text-lg">Start Date</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex flex-col">
            <label className="md:text-lg">End Date</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Book;
