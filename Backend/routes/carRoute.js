import express from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCarById,
} from "../controllers/carController.js";

import { allowRole } from "../middlewares/roleMiddleware.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createCar", authenticate, allowRole("admin"), createCar);
router.get("/getAllCars", getAllCars);
router.get("/getCarById/:id", authenticate, getCarById);
router.delete("/deleteCar/:id", authenticate, allowRole("admin"), deleteCar);

export default router;
