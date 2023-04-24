"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: false },
    payment_type: { type: String, required: false },
    payment_card: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
