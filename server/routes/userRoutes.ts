import express from "express";
import { loginUser } from "../controllers/usersController";

const router = express.Router();
router.post("/login", loginUser);

export default router;
