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
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
