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
// Controller function for creating a new order
function createOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, items } = req.body;
            // Calculate the total price of the order
            const total_price = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
            // Create a new order document in the database
            const order = yield order_1.default.create({ user_id, total_price });
            // Create order item documents in the database
            const order_item = yield Promise.all(items.map((item) => __awaiter(this, void 0, void 0, function* () {
                const { product_variant_id, quantity, price } = item;
                return yield order_item_1.default.create({
                    order_id: order._id,
                    product_variant_id,
                    quantity,
                    price,
                });
            })));
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
            const orderId = req.params.id;
            const order = yield order_1.default.findById(orderId).populate("user_id");
            const order_item = yield order_item_1.default.find({
                order_id: orderId,
            }).populate("product_variant_id");
            res.json({ order, order_item });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.getOrder = getOrder;
