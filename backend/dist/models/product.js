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
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
