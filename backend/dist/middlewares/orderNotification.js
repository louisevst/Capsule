"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderNotificationEmail = void 0;
const nodemailer = require("nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
const order_1 = __importDefault(require("../models/order"));
const poduct_variant_1 = __importDefault(require("../models/poduct_variant"));
dotenv_1.default.config();
function sendOrderNotificationEmail(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderDetails = yield getOrderDetails(orderId);
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        const mailOptions = {
            from: "contact.capsule.wardrobe@gmail.com",
            to: "contact.capsule.wardrobe@gmail.com",
            subject: "New order !",
            text: `A customer just placed an order! The order ID is ${orderId}. Here are the details of the order: ${JSON.stringify(orderDetails)}`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log("Order notification email sent");
        }
        catch (error) {
            console.error("Error sending order notification email:", error);
        }
    });
}
exports.sendOrderNotificationEmail = sendOrderNotificationEmail;
function getOrderDetails(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield order_1.default.findById(orderId).populate({
            path: "order_items",
            populate: {
                path: "product_variant_id",
                model: poduct_variant_1.default,
                populate: {
                    path: "product_id",
                    model: "Product",
                },
            },
        });
        if (!order) {
            throw new Error("Order not found");
        }
        const orderItems = order.order_items.map((item) => {
            const { _id, quantity, price, product_variant_id } = item;
            const { color, fit, size, images, product_id } = product_variant_id;
            const { type, description, theme, image } = product_id;
            return {
                _id,
                quantity,
                price,
                color,
                fit,
                size,
                images,
                type,
                description,
                theme,
                image,
            };
        });
        return {
            _id: order._id,
            user_id: order.user_id,
            date_ordered: order.date_ordered,
            total_price: order.total_price,
            order_items: orderItems,
        };
    });
}
