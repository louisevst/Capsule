import express from "express";
import * as bagController from "../controllers/bag";

const router = express.Router();

router.get("/", bagController.getBags);
router.get("/:id", bagController.getBagById);
router.post("/", bagController.createBag);
router.put("/:id", bagController.updateBag);
router.delete("/:id/variants/:variantId", bagController.deleteVariantFromBag);

export default router;
