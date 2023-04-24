"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
