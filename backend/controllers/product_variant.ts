import { Request, Response } from "express";
import Product_Variant from "../models/poduct_variant";

export const createProductVariant = async (req: Request, res: Response) => {
  try {
    const productVariant = new Product_Variant({
      product_id: req.body.product_id,
      color: req.body.color,
      fit: req.body.fit,
      size: req.body.size,
      images: req.body.images,
    });

    const savedProductVariant = await productVariant.save();
    res.status(201).json(savedProductVariant);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductVariantById = async (req: Request, res: Response) => {
  try {
    const productVariant = await Product_Variant.findById(req.params.id);
    res.json(productVariant);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProductVariants = async (req: Request, res: Response) => {
  try {
    const productVariants = await Product_Variant.find();
    res.json(productVariants);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
