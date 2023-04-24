"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const bag_1 = __importDefault(require("./routes/bag"));
const wishlist_1 = __importDefault(require("./routes/wishlist"));
const order_1 = __importDefault(require("./routes/order"));
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
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use((req, res, next) => {
    res.status(201);
    next();
});
app.use("/api/product", product_1.default);
app.use("/api/auth", user_1.default);
app.use("/api/bag", bag_1.default);
app.use("/api/wishlist", wishlist_1.default);
app.use("/api/order", order_1.default);
exports.default = app;
