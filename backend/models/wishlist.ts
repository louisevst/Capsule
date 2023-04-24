import mongoose from "mongoose";

interface Wishlist {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
}

const wishlistSchema = new mongoose.Schema<Wishlist>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const Wishlist = mongoose.model<Wishlist>("Wishlist", wishlistSchema);

export default Wishlist;
