import mongoose from "mongoose";

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  payment_type: string;
  payment_card: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String, required: false },
  payment_type: { type: String, required: false },
  payment_card: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
