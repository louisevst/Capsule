import express from "express";
import * as WishlistController from "../controllers/wishlist";

const router = express.Router();

router.get("/:id", WishlistController.getWishlistItems);
router.post("/", WishlistController.createWishlistItem);
router.put("/:id", WishlistController.updateWishlist);
router.delete("/:id/:product", WishlistController.deleteWishlistItem);

export default router;
