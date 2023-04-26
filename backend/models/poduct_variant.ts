import mongoose from "mongoose";

export interface IProductVariant {
  _id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  color: string;
  fit: string;
  size: string;
  images: string[];
  createdAt: Date;
}

const productVariantSchema = new mongoose.Schema<IProductVariant>({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  fit: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product_Variant = mongoose.model<IProductVariant>(
  "Product_Variant",
  productVariantSchema
);

export default Product_Variant;
