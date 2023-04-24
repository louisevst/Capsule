import express, { Express, Request, Response } from "express";
import mongoose, { MongooseOptions } from "mongoose";
import dotenv from "dotenv";
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

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});
export default app;
