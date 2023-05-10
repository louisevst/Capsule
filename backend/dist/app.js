"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const bag_1 = __importDefault(require("./routes/bag"));
const wishlist_1 = __importDefault(require("./routes/wishlist"));
const order_1 = __importDefault(require("./routes/order"));
const message_1 = __importDefault(require("./routes/message"));
const product_details_1 = __importDefault(require("./routes/product_details"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
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
const app = (0, express_1.default)();
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default
    .connect(`mongodb+srv://louisevassart:${password}@cluster.xltoske.mongodb.net/?retryWrites=true&w=majority`, options)
    .then(() => console.log("Connection to MongoDB successfull ✨"))
    .catch(() => console.log("Connection to MongoDB failed 🛑"));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of the session ID cookie
    },
}));
app.use((req, res, next) => {
    console.log("Request received 💫");
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
app.use((0, cors_1.default)());
app.use("/api/product", product_1.default);
app.use("/api/auth", user_1.default);
app.use("/api/bag", bag_1.default);
app.use("/api/wishlist", wishlist_1.default);
app.use("/api/order", order_1.default);
app.use("/api/message", message_1.default);
app.use("/api/product/details", product_details_1.default);
exports.default = app;
