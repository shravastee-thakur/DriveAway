import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";

export const createBooking = async (req, res, next) => {
  try {
    const { car, startDate, endDate } = req.body;
    const user = req.user.id;

    const carDetails = await Car.findById(car);
    if (!carDetails) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const existingBooking = await Booking.find({
      car,
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });

    if (existingBooking.length > 0) {
      return res.status(400).json({
        message: "Car is already booked for the selected dates",
      });
    }

    const days =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ) + 1;

    const totalPrice = days * carDetails.pricePerDay;

    const booking = await Booking.create({
      car,
      user,
      startDate,
      endDate,
      totalPrice,
    });

    await Car.findByIdAndUpdate(car, {
      $push: { bookingsId: booking._id },
    });

    return res
      .status(200)
      .json({ success: true, data: booking, message: "Booking successful" });
  } catch (error) {
    next();
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const allBookings = await Booking.find()
      .sort({ created: -1 })
      .populate("car")
      .populate("user", "-password");

    return res.status(200).json({
      success: true,
      data: allBookings,
      message: "Fetched booking data successfully",
    });
  } catch (error) {
    next();
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const myBooking = await Booking.find({ user: userId })
      .populate("car")
      .populate("user", "-password");

    if (!myBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({
      success: true,
      data: myBooking,
      message: "Fetched booking data successfully",
    });
  } catch (error) {
    next();
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const booking = await Booking.findById(carId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      booking.user.toString() !== req.user.id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await booking.deleteOne();

    await Car.findByIdAndUpdate(booking.car, {
      $pull: { bookingsId: booking._id },
    });

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    next();
  }
};
