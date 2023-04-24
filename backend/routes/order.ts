import express from "express";
import { createOrder, getOrders, getOrder } from "../controllers/order";

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get a single order
router.get("/:id", getOrder);

export default router;
