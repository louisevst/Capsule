import express, { Express } from "express";
import mongoose, { MongooseOptions } from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";
import bagRoutes from "./routes/bag";
import wishlistRoutes from "./routes/wishlist";
import orderRoutes from "./routes/order";

dotenv.config();

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
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Requête reçue !");
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

export default app;
