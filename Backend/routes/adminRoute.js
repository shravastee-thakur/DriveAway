import express from "express";
import { deleteUser, getAllUsers } from "../controllers/adminController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { allowRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", authenticate, allowRole("admin"), getAllUsers);
router.delete("/deleteUser/:id", authenticate, allowRole("admin"), deleteUser);

export default router;
