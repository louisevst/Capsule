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
exports.deleteVariantFromBag = exports.updateBag = exports.createBag = exports.getBagById = exports.getBags = void 0;
const bag_1 = __importDefault(require("../models/bag"));
const mongoose_1 = __importDefault(require("mongoose"));
const getBags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bags = yield bag_1.default.find();
        res.json(bags);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.getBags = getBags;
const getBagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bag = yield bag_1.default.find({ user_id: req.params.id });
        if (!bag || bag.length === 0) {
            return res.status(404).send("Bag not found");
        }
        res.json(bag);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.getBagById = getBagById;
const createBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, product_variant_id, quantity } = req.body;
        const bagData = {
            _id: new mongoose_1.default.Types.ObjectId(),
            user_id,
            product_variant_id,
            quantity,
            date_added: new Date(),
        };
        const bag = new bag_1.default(bagData);
        yield bag.save();
        res.status(201).json(bag);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.createBag = createBag;
const updateBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_variant_id, quantity } = req.body;
        console.log(product_variant_id);
        console.log(req.body);
        const bag = yield bag_1.default.findById(req.params.id);
        if (!bag) {
            return res.status(404).send("Bag not found");
        }
        // Update product_variant_id array
        if (product_variant_id) {
            bag.product_variant_id.push(...product_variant_id);
        }
        // Update quantity
        if (quantity) {
            bag.quantity = quantity;
        }
        yield bag.save();
        res.json(bag);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.updateBag = updateBag;
const deleteVariantFromBag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bagId = req.params.id;
        const variantId = req.params.variantId;
        if (!mongoose_1.default.Types.ObjectId.isValid(variantId)) {
            return res.status(404).send("Invalid variantId");
        }
        const bag = yield bag_1.default.findById(bagId);
        if (!bag) {
            return res.status(404).send("Bag not found");
        }
        const index = bag.product_variant_id.indexOf(variantId);
        if (index === -1) {
            return res.status(404).send("Variant not found in bag");
        }
        bag.product_variant_id.splice(index, 1); // Remove the variant from the array
        yield bag.save();
        res.json(bag);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.deleteVariantFromBag = deleteVariantFromBag;
