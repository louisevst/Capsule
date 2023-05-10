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
exports.getAllProductVariants = exports.getProductVariantById = exports.createProductVariant = void 0;
const poduct_variant_1 = __importDefault(require("../models/poduct_variant"));
const createProductVariant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productVariant = new poduct_variant_1.default({
            product_id: req.body.product_id,
            color: req.body.color,
            fit: req.body.fit,
            size: req.body.size,
            images: req.body.images,
        });
        const savedProductVariant = yield productVariant.save();
        res.status(201).json(savedProductVariant);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createProductVariant = createProductVariant;
const getProductVariantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productVariant = yield poduct_variant_1.default.findById(req.params.id);
        res.json(productVariant);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getProductVariantById = getProductVariantById;
const getAllProductVariants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productVariants = yield poduct_variant_1.default.find();
        res.json(productVariants);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllProductVariants = getAllProductVariants;
