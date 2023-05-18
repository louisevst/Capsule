"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bagSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product_variant_id: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Product_variant",
            required: true,
        },
    ],
    quantity: { type: Number, default: 1, required: true },
    date_added: { type: Date, default: Date.now },
});
const Bag = mongoose_1.default.model("Bag", bagSchema);
exports.default = Bag;
