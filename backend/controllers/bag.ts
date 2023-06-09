import { Request, Response } from "express";
import Bag, { IBag } from "../models/bag";
import mongoose from "mongoose";
import { ObjectId, Types } from "mongoose";

export const getBags = async (req: Request, res: Response) => {
  try {
    const bags = await Bag.find();
    res.json(bags);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getBagById = async (req: Request, res: Response) => {
  try {
    const bag = await Bag.find({ user_id: req.params.id });

    if (!bag || bag.length === 0) {
      return res.status(404).send("Bag not found");
    }
    res.json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const createBag = async (req: Request, res: Response) => {
  try {
    const { user_id, product_variant_id, quantity } = req.body;
    const bagData: IBag = {
      _id: new mongoose.Types.ObjectId(),
      user_id,
      product_variant_id,
      quantity,
      date_added: new Date(),
    };
    const bag = new Bag(bagData);
    await bag.save();
    res.status(201).json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const updateBag = async (req: Request, res: Response) => {
  try {
    const { product_variant_id, quantity } = req.body;
    console.log(product_variant_id);
    console.log(req.body);
    const bag = await Bag.findById(req.params.id);

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

    await bag.save();
    res.json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
export const deleteVariantFromBag = async (req: Request, res: Response) => {
  try {
    const bagId = req.params.id;
    const variantId = req.params.variantId;

    const variant = new mongoose.Types.ObjectId(variantId);

    const bag = await Bag.findById(bagId);
    if (!bag) {
      return res.status(404).send("Bag not found");
    }

    const index = bag.product_variant_id.indexOf(variant);
    if (index === -1) {
      return res.status(404).send("Variant not found in bag");
    }

    bag.product_variant_id.splice(index, 1); // Remove the variant from the array

    await bag.save();
    res.json(bag);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
export const deleteBag = async (req: Request, res: Response) => {
  try {
    const bagId = req.params.id;
    const bag = await Bag.findByIdAndDelete(bagId);

    if (!bag) {
      return res.status(404).send("Bag not found");
    }

    res.json({ message: "Bag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
