"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    image: { type: String, required: true },
    alt: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    sizes: { type: [String] },
    fits: { type: [String] },
    colors: { type: [String] },
});
productSchema.pre("save", function (next) {
    // Access the current product being saved
    const product = this;
    // Check if the type is "Jewellery"
    if (product.type === "Jewellery") {
        // Set a default size for jewellery products
        product.sizes = ["One Size"];
    }
    else {
        product.sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    }
    next();
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
