import { Request, Response } from "express";
import Product from "../models/product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product not found");
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = new Product({
    type: req.body.type,
    description: req.body.description,
    theme: req.body.theme,
    image: req.body.image,
    price: req.body.price,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.type = req.body.type || product.type;
      product.description = req.body.description || product.description;
      product.theme = req.body.theme || product.theme;
      product.image = req.body.image || product.image;
      product.price = req.body.price || product.price;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw new Error("Product not found");
    res.status(200).json(deletedProduct);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
