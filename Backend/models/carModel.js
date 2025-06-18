import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    seatCapacity: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
    },
    carImage: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
