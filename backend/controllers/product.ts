import { Request, Response } from "express";
import Product from "../models/product";
import Product_Variant from "../models/poduct_variant";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    // Retrieve the unique sets of sizes, fits, and colors using aggregation
    Product_Variant.aggregate([
      {
        $group: {
          _id: null,
          sizes: { $addToSet: "$size" },
          fits: { $addToSet: "$fit" },
          colors: { $addToSet: "$color" },
        },
      },
    ])
      .exec()
      .then((result) => {
        if (result.length > 0) {
          const { sizes, fits, colors } = result[0];

          const productsWithColorsAndFits = products.map((product: any) => {
            let updatedSizes: string[];
            let updatedFits: string[];
            let updatedColors: string[];

            if (product.type === "Jewellery") {
              updatedSizes = ["One Size"];
              updatedFits = ["Regular"];
              updatedColors = ["Silver", "Gold"];
            } else {
              updatedSizes = sizes;
              updatedFits = fits;
              updatedColors = colors;
            }

            switch (product.theme) {
              case "Spring/Summer":
                updatedColors = [
                  "Blue",
                  "Pink",
                  "Teal",
                  "Bright-Red",
                  "Blue-Grey",
                  "Mustard",
                  "Jungle-Green",
                  "Black",
                  "White",
                  "Beige",
                  "Off-White",
                ];
                break;
              case "Party":
                updatedColors = [
                  "Blue",
                  "Gold",
                  "Jungle-Green",
                  "Raspberry",
                  "Mustard",
                  "Silver",
                  "Bright-Red",
                  "Black",
                  "White",
                  "Beige",
                  "Off-White",
                ];
                break;
              case "Fall/Winter":
                updatedColors = [
                  "Blue-Grey",
                  "Jungle-Green",
                  "Mustard",
                  "Raspberry",
                  "Khaki",
                  "Teal",
                  "Black",
                  "White",
                  "Beige",
                  "Off-White",
                ];
                break;
              case "Swimwear":
                updatedColors = [
                  "Blue",
                  "Blue-Grey",
                  "Jungle-Green",
                  "Mustard",
                  "Bright-Red",
                  "Khaki",
                  "Black",
                  "White",
                  "Beige",
                  "Off-White",
                ];
                break;
            }

            return {
              ...product.toObject(),
              sizes: updatedSizes,
              fits: updatedFits,
              colors: updatedColors,
            };
          });

          res.status(200).json({ products: productsWithColorsAndFits });
        } else {
          res.status(200).json({ products, sizes: [], fits: [], colors: [] });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      });
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
    name: req.body.name,
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
