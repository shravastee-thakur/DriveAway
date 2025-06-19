import { useState, useEffect } from "react";

const Book = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Calculate days difference
      const diffTime = end - start;
      if (diffTime >= 0) {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDays(diffDays);
      } else {
        setDays(0);
      }
    } else {
      setDays(0);
    }
  }, [startDate, endDate]);

  const handleBooking = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const bookingData = {
      startDate,
      endDate,
    };


    console.log("Sending to backend:", bookingData);
    // axios.post("/api/bookings", bookingData, { headers: { Authorization: `Bearer token` } })
  };

  return (
    <section className="bg-orange-400 py-14">
      <div className="bg-orange-200 px-10 py-6 h-auto w-10/12 mx-auto rounded-lg border-2 border-white lg:mx-auto lg:w-11/12 lg:rounded-lg lg:border-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col">
            <label className="md:text-lg">Pick-up</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="text"
              placeholder="Enter location"
            />
          </div>

          <div className="flex flex-col">
            <label className="md:text-lg">Drop-off</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="text"
              placeholder="Enter location"
            />
          </div>

          <div className="flex flex-col">
            <label className="md:text-lg">Start Date</label>
            <input
              className="bg-white border border-slate-300 py-1 px-1 md:py-2 md:px-4 rounded-lg"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // disables past dates
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

          <div className="md:col-span-2 lg:col-span-1 flex justify-center items-end">
            <button
              className="bg-[#ff4d30] hover:bg-[#f01a1a] text-white mt-6 px-12 py-2 border-none rounded-lg"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>

        {days > 0 && (
          <div className="flex justify-center mt-4">
            <p className="font-semibold">Total Days: {days}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Book;
