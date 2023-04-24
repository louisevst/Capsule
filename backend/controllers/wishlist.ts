import { Request, Response } from "express";
import Wishlist from "../models/wishlist";

// Controller function for creating a new wishlist item
export async function createWishlistItem(req: Request, res: Response) {
  try {
    const { user_id, product_id } = req.body;

    // Check if the wishlist item already exists
    const existingWishlistItem = await Wishlist.findOne({
      user_id,
      product_id,
    });

    if (existingWishlistItem) {
      return res.status(400).json({ message: "Wishlist item already exists" });
    }

    // Create a new wishlist item document in the database
    const wishlistItem = await Wishlist.create({ user_id, product_id });

    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Controller function for retrieving all wishlist items for a user
export async function getWishlistItems(req: Request, res: Response) {
  try {
    const { user_id } = req.params;

    const wishlistItems = await Wishlist.find({ user_id }).populate(
      "product_id"
    );

    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Controller function for deleting a wishlist item
export async function deleteWishlistItem(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Find and delete the wishlist item document in the database
    const deletedWishlistItem = await Wishlist.findByIdAndDelete(id);

    if (!deletedWishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res.json(deletedWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
