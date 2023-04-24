import mongoose from "mongoose";

interface ProductVariant {
  product_id: mongoose.Types.ObjectId;
  color: string;
  fit: string;
  size: string;
  images: string[];
  createdAt: Date;
}

const productVariantSchema = new mongoose.Schema<ProductVariant>({
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

const Product_Variant = mongoose.model<ProductVariant>(
  "Product_variant",
  productVariantSchema
);

export default Product_Variant;
