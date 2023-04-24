import mongoose from "mongoose";

interface Order {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  date_ordered: Date;
  total_price: Number;
}

const orderSchema = new mongoose.Schema<Order>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total_price: { type: Number, required: true },
  date_ordered: { type: Date, default: Date.now },
});

const Order = mongoose.model<Order>("Order", orderSchema);

export default Order;
