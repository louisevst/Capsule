"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_variant_1 = require("../controllers/product_variant");
const router = express_1.default.Router();
router.post("/", product_variant_1.createProductVariant);
router.get("/:id", product_variant_1.getProductVariantById);
router.get("/", product_variant_1.getAllProductVariants);
exports.default = router;
