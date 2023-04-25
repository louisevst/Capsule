"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const order_itemsSchema = new mongoose_1.default.Schema({
    order_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    product_variant_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product_Variant",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
const Order_items = mongoose_1.default.model("Order_items", order_itemsSchema);
exports.default = Order_items;
