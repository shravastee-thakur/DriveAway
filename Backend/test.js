import { useState, useEffect } from "react";

const Book = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end < start) {
        setError("End date cannot be before start date");
        setDays(0);
        return;
      }

      setError("");
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    } else {
      setDays(0);
    }
  }, [startDate, endDate]);

  return (
    <section className="bg-orange-400 py-14">
      <div className="bg-orange-200 px-10 py-6 h-auto w-10/12 mx-auto rounded-lg border-2 border-white lg:mx-auto lg:w-11/12 lg:rounded-lg lg:border-3">
        <div className="grid grid-cols-1 gap-3 md:grid md:grid-cols-2 lg:grid lg:grid-cols-5">
          {/* ... your existing input fields ... */}
        </div>

        {error && (
          <div className="flex justify-center mt-4">
            <p className="font-semibold text-red-600">{error}</p>
          </div>
        )}

        {days > 0 && !error && (
          <div className="flex justify-center mt-4">
            <p className="font-semibold">Total Days: {days}</p>
          </div>
        )}
      </div>
    </section>
  );
};
