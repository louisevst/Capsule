import mongoose from "mongoose";

export interface IBag {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  product_variant_id: mongoose.Types.ObjectId;
  quantity: Number;
  date_added: Date;
}

const bagSchema = new mongoose.Schema<IBag>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_variant",
    required: true,
  },
  quantity: { type: Number, default: 1, required: true },
  date_added: { type: Date, default: Date.now },
});

const Bag = mongoose.model<IBag>("Bag", bagSchema);

export default Bag;
