import express from "express";
import { sendMessage } from "../controllers/message";
import { validateMessage } from "../middlewares/message";

const router = express.Router();

router.post("/", validateMessage, sendMessage);

export default router;
