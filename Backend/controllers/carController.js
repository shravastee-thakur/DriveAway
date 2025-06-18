import { rejects } from "assert";
import Car from "../models/carModel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import { resolve } from "path";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCar = async (req, res, next) => {
  try {
    const {
      modelName,
      pricePerDay,
      seatCapacity,
      fuelType,
      transmission,
      isAvailable,
    } = req.body;

    if (!req.files?.carImage) {
      return res.status(400).json({ message: "Car image is required" });
    }

    const file = req.files.carImage;
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "DriveAway" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.data);
    });

    const newCar = await Car.create({
      modelName,
      pricePerDay,
      seatCapacity,
      fuelType,
      transmission,
      isAvailable,
      carImage: result.secure_url,
      owner: req.user.id,
    });

    return res
      .status(200)
      .json({ success: true, car: newCar, message: "Car added successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllCars = async (req, res, next) => {
  try {
    const allCars = await Car.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, allCars });
  } catch (error) {
    next(error);
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json({ success: true, car });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await Car.findByIdAndDelete(carId);
    return res
      .status(200)
      .json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    next(error);
  }
};
