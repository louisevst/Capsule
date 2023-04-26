import mongoose from "mongoose";

export interface IOrder_items {
  _id: mongoose.Types.ObjectId;
  order_id: mongoose.Types.ObjectId;
  product_variant_id: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

const order_itemsSchema = new mongoose.Schema<IOrder_items>({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product_variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_Variant",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Order_items = mongoose.model<IOrder_items>(
  "Order_items",
  order_itemsSchema
);

export default Order_items;
