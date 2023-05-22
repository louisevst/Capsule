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
exports.updateWishlist = exports.deleteWishlistItem = exports.getWishlistItems = exports.createWishlistItem = void 0;
const wishlist_1 = __importDefault(require("../models/wishlist"));
const mongoose_1 = __importDefault(require("mongoose"));
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
            console.log("get" + req.params);
            const { id } = req.params;
            console.log("get" + id);
            const wishlistItems = yield wishlist_1.default.find({ user_id: id }).populate("product_id");
            console.log("get" + wishlistItems);
            res.json(wishlistItems);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.getWishlistItems = getWishlistItems;
function deleteWishlistItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, product } = req.params;
            console.log(id, product, req.params);
            if (!mongoose_1.default.Types.ObjectId.isValid(product)) {
                return res.status(404).send("Invalid product id");
            }
            // Find and delete the wishlist item document in the database
            const wishlistItem = yield wishlist_1.default.findById(id);
            if (!wishlistItem) {
                return res.status(404).json({ message: "Wishlist item not found" });
            }
            // Find the index of the product in the wishlist item's product array
            const productIndex = wishlistItem.product_id.indexOf(product);
            if (productIndex === -1) {
                return res.status(404).json({ message: "Product not found in wishlist" });
            }
            // Remove the product from the wishlist item's product array
            wishlistItem.product_id.splice(productIndex, 1);
            // Save the updated wishlist item
            const updatedWishlistItem = yield wishlistItem.save();
            res.json(updatedWishlistItem);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }
    });
}
exports.deleteWishlistItem = deleteWishlistItem;
const updateWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist = yield wishlist_1.default.findById(req.params.id);
        if (!wishlist) {
            return res.status(404).send("wishlist not found");
        }
        // Update product_id array
        if (req.body.product) {
            wishlist.product_id.push(req.body.product);
        }
        yield wishlist.save();
        res.json(wishlist);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.updateWishlist = updateWishlist;
