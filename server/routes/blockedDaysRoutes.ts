import express from "express";
import {
  deleteBlockedDay,
  getBlockedDays,
  postBlockedDays,
} from "../controllers/blockedDaysController";
import { jwtValidation } from "../middlewares/jwtValidation";

const router = express.Router();
router.get("/blocked", getBlockedDays);
router.post("/blocked", jwtValidation, postBlockedDays);
router.delete("/blocked/:id", jwtValidation, deleteBlockedDay);

export default router;
