import express from "express";
import {
  createProductVariant,
  getProductVariantById,
  getAllProductVariants,
  getProductDetails,
} from "../controllers/product_variant";

const router = express.Router();

router.post("/", createProductVariant);
router.get("/:product_id", getProductVariantById);
router.get("/", getAllProductVariants);
router.get("/id/:id", getProductDetails);

export default router;
