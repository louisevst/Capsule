"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("./models/product"));
const poduct_variant_1 = __importDefault(require("./models/poduct_variant"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.MONGODB_PASSWORD;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connect(`mongodb+srv://louisevassart:${password}@cluster.xltoske.mongodb.net/?retryWrites=true&w=majority`, options);
const products = [
    {
        type: "Blazer",
        description: "A classic blazer that will give an elevated look to any of your outfit.",
        theme: "Spring Vibes",
        image: "https://example.com/shirt.jpg",
        price: 100,
        variants: [
            {
                color: "Red",
                fit: "Regular",
                size: "M",
                images: ["https://example.com/tshirt-red.jpg"],
            },
            {
                color: "Blue",
                fit: "Regular",
                size: "M",
                images: ["https://example.com/tshirt-blue.jpg"],
            },
            {
                color: "Green",
                fit: "Slim",
                size: "L",
                images: ["https://example.com/tshirt-green.jpg"],
            },
        ],
    },
    {
        type: "Suit pants",
        description: "A pair of suit pants that fits just right. We have matching blazer if you like the full look.",
        theme: "Spring Vibes",
        image: "https://example.com/jeans.jpg",
        price: 89,
        variants: [
            {
                color: "Red",
                fit: "Regular",
                size: "M",
                images: ["https://example.com/tshirt-red.jpg"],
            },
            {
                color: "Blue",
                fit: "Regular",
                size: "M",
                images: ["https://example.com/tshirt-blue.jpg"],
            },
            {
                color: "Green",
                fit: "Slim",
                size: "L",
                images: ["https://example.com/tshirt-green.jpg"],
            },
        ],
    },
];
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const product of products) {
            const newProduct = new product_1.default(product);
            yield newProduct.save();
            for (const variant of product.variants) {
                const newVariant = new poduct_variant_1.default(Object.assign({ product_id: newProduct._id }, variant));
                yield newVariant.save();
            }
        }
        console.log("Database seeded successfully");
        mongoose_1.default.disconnect();
    });
}
seed();
