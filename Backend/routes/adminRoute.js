import express from "express";
import { deleteUser, getAllUsers } from "../controllers/adminController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", authenticate, getAllUsers);
router.delete("/deleteUser", authenticate, deleteUser);

export default router;
