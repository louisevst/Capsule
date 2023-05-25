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
exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const order_item_1 = __importDefault(require("../models/order_item"));
const poduct_variant_1 = __importDefault(require("../models/poduct_variant"));
const orderConfirmation_1 = require("../middlewares/orderConfirmation");
const orderNotification_1 = require("../middlewares/orderNotification");
const product_1 = __importDefault(require("../models/product"));
// Controller function for creating a new order
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, items, email } = req.body;
            // Calculate the total price of the order
            const total_price = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
            // Create a new order document in the database
            const order = yield order_1.default.create({ user_id, total_price });
            // Create order item documents in the database
            const order_item = yield Promise.all(
            // Update this line
            items.map((item) => __awaiter(this, void 0, void 0, function* () {
                const { product_variant_id, quantity, price, name } = item;
                return yield order_item_1.default.create({
                    // Update this line
                    order_id: order._id,
                    product_variant_id,
                    quantity,
                    price,
                    name,
                });
            })));
            const orderid = order._id.toString();
            // Fetch the related product variants
            const productVariantIds = order_item.map((item) => item.product_variant_id);
            const productVariants = yield poduct_variant_1.default.find({
                _id: { $in: productVariantIds },
            }).exec();
            // Fetch the related products
            const productIds = productVariants.map((variant) => variant.product_id);
            const products = yield product_1.default.find({ _id: { $in: productIds } }).exec();
            // Send the order notification email
            yield (0, orderNotification_1.sendOrderNotificationEmail)(order, order_item, products, productVariants);
            yield (0, orderConfirmation_1.sendOrderConfirmationEmail)(email, order, order_item, products, productVariants);
            res.status(201).json({ order, order_item });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.createOrder = createOrder;
// Controller function for retrieving all orders
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_1.default.find({}).populate("user_id");
            res.json(orders);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.getOrders = getOrders;
// Controller function for retrieving a single order and its order items
function getOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const orders = yield order_1.default.find({ user_id: userId }).populate("user_id");
            for (const order of orders) {
                const orderItems = yield order_item_1.default.find({
                    order_id: order._id,
                }).populate("product_variant_id");
                order.order_items = orderItems;
            }
            res.json({ orders });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.getOrder = getOrder;
