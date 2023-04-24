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
exports.deleteWishlistItem = exports.getWishlistItems = exports.createWishlistItem = void 0;
const wishlist_1 = __importDefault(require("../models/wishlist"));
// Controller function for creating a new wishlist item
function createWishlistItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id, product_id } = req.body;
            // Check if the wishlist item already exists
            const existingWishlistItem = yield wishlist_1.default.findOne({
                user_id,
                product_id,
            });
            if (existingWishlistItem) {
                return res.status(400).json({ message: "Wishlist item already exists" });
            }
            // Create a new wishlist item document in the database
            const wishlistItem = yield wishlist_1.default.create({ user_id, product_id });
            res.status(201).json(wishlistItem);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.createWishlistItem = createWishlistItem;
// Controller function for retrieving all wishlist items for a user
function getWishlistItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = req.params;
            const wishlistItems = yield wishlist_1.default.find({ user_id }).populate("product_id");
            res.json(wishlistItems);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.getWishlistItems = getWishlistItems;
// Controller function for deleting a wishlist item
function deleteWishlistItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // Find and delete the wishlist item document in the database
            const deletedWishlistItem = yield wishlist_1.default.findByIdAndDelete(id);
            if (!deletedWishlistItem) {
                return res.status(404).json({ message: "Wishlist item not found" });
            }
            res.json(deletedWishlistItem);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.deleteWishlistItem = deleteWishlistItem;
