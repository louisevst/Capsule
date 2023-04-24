import mongoose from "mongoose";

interface Product {
  type: String;
  description: String;
  theme: String;
  image: String;
  price: Number;
  createdAt: Date;
}

const productSchema = new mongoose.Schema<Product>({
  type: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;
