import express from "express";
import {
  createProductVariant,
  getProductVariantById,
  getAllProductVariants,
} from "../controllers/product_variant";

const router = express.Router();

router.post("/", createProductVariant);
router.get("/:id", getProductVariantById);
router.get("/", getAllProductVariants);

export default router;
