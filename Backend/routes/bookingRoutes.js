import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getMyBookings,
} from "../controllers/bookingController.js";

import { allowRole } from "../middlewares/roleMiddleware.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createBooking", authenticate, createBooking);
router.get("/getAllBookings", authenticate, allowRole("admin"), getAllBookings);
router.get("/myBooking", authenticate, getMyBookings);
router.delete(
  "/deleteBooking/:id",
  authenticate,
  allowRole("user", "admin"),
  deleteBooking
);

export default router;
