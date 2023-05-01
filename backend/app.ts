import express, { Express } from "express";
import mongoose, { MongooseOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import bagRoutes from "./routes/bag";
import wishlistRoutes from "./routes/wishlist";
import orderRoutes from "./routes/order";
import messageRoutes from "./routes/message";
import session from "express-session";
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
// const imageUrl = cloudinary.url("collection/Spring Vibes/jumpsuit.jpg", {
//   width: 500,
//   height: 500,
//   crop: "fill",
// });

const password = process.env.MONGODB_PASSWORD;
const app: Express = express();

const options: MongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as MongooseOptions;

mongoose
  .connect(
    `mongodb+srv://louisevassart:${password}@cluster.xltoske.mongodb.net/?retryWrites=true&w=majority`,
    options
  )
  .then(() => console.log("Connection to MongoDB successfull ✨"))
  .catch(() => console.log("Connection to MongoDB failed 🛑"));

app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: false, // Whether the session ID cookie should be inaccessible to client-side scripts
      maxAge: 30 * 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of the session ID cookie
    },
  })
);

app.use((req, res, next) => {
  console.log("Request received 💫");
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use("/api/product", productRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/bag", bagRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/message", messageRoutes);

export default app;
