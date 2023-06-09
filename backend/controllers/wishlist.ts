import { Request, Response } from "express";
import Wishlist from "../models/wishlist";
import { Types } from "mongoose";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

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
    console.log("get" + req.params);
    const { id } = req.params;
    console.log("get" + id);
    const wishlistItems = await Wishlist.find({ user_id: id }).populate(
      "product_id"
    );
    console.log("get" + wishlistItems);
    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteWishlistItem(req: Request, res: Response) {
  try {
    const { id, product } = req.params;

    const productId = new mongoose.Types.ObjectId(product);
    // Find and delete the wishlist item document in the database
    const wishlistItem = await Wishlist.findById(id);

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    // Find the index of the product in the wishlist item's product array
    const productIndex = wishlistItem.product_id.indexOf(productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    // Remove the product from the wishlist item's product array
    wishlistItem.product_id.splice(productIndex, 1);

    // Save the updated wishlist item
    const updatedWishlistItem = await wishlistItem.save();

    res.json(updatedWishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export const updateWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);

    if (!wishlist) {
      return res.status(404).send("wishlist not found");
    }

    // Update product_id array
    if (req.body.product) {
      wishlist.product_id.push(req.body.product);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
