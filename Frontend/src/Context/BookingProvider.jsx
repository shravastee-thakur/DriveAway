import { createContext, useState } from "react";

export const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState({
    startDate: "",
    endDate: "",
    pickupLocation: "",
    dropLocation: "",
    totalDays: "",
  });
  return (
    <div>
      <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
        {children}
      </BookingContext.Provider>
    </div>
  );
};

export default BookingProvider;
