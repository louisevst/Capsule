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
exports.updateBag = exports.createBag = exports.getBagById = exports.getBags = void 0;
const bag_1 = __importDefault(require("../models/bag"));
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
        console.log(req.params.id);
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
        const bag = new bag_1.default(req.body);
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
        const bag = yield bag_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!bag) {
            return res.status(404).send("Bag not found");
        }
        res.json(bag);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.updateBag = updateBag;
