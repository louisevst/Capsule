import express from "express";
import * as WishlistController from "../controllers/wishlist";

const router = express.Router();

router.get("/", WishlistController.getWishlistItems);
router.post("/", WishlistController.createWishlistItem);
router.put("/:id", WishlistController.deleteWishlistItem);

export default router;
