import mongoose from "mongoose";

export interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: String;
  type: String;
  description: String;
  theme: String;
  image: String;
  alt: String;
  price: Number;
  createdAt: Date;
  sizes: string[];
  fits: string[];
  colors: string[];
}

const productSchema = new mongoose.Schema<IProduct>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  sizes: { type: [String] },
  fits: { type: [String] },
  colors: { type: [String] },
});
productSchema.pre("save", function (next) {
  // Access the current product being saved
  const product = this as IProduct;

  // Check if the type is "Jewellery"
  if (product.type === "Jewellery") {
    // Set a default size for jewellery products
    product.sizes = ["One Size"];
  } else {
    product.sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  }

  next();
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
