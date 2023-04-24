"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.MONGODB_PASSWORD;
const app = (0, express_1.default)();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect(`mongodb+srv://louisevassart:${password}@cluster.xltoske.mongodb.net/?retryWrites=true&w=majority`, options)
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
exports.default = app;
