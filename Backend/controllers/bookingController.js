import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";

export const createBooking = async (req, res, next) => {
  try {
    const { car, startDate, endDate, totalPrice } = req.body;
    const user = req.user.id;

    const existingBooking = await Booking.find({
      car,
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });

    if (existingBooking.length > 0) {
      return res.status(400).json({
        message: "Car is already booked for the selected dates",
      });
    }

    const booking = await Booking.create({
      car,
      user,
      startDate,
      endDate,
      totalPrice,
    });

    await Car.findByIdAndUpdate(car, {
      $push: { bookingsId: createBooking._id },
    });

    return res
      .status(200)
      .json({ success: true, data: booking, message: "Booking successful" });
  } catch (error) {
    next();
  }
  y;
};
