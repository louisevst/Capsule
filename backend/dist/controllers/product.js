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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const poduct_variant_1 = __importDefault(require("../models/poduct_variant"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find();
        // Retrieve the unique sets of sizes, fits, and colors using aggregation
        poduct_variant_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    sizes: { $addToSet: "$size" },
                    fits: { $addToSet: "$fit" },
                    colors: { $addToSet: "$color" },
                },
            },
        ])
            .exec()
            .then((result) => {
            if (result.length > 0) {
                const { sizes, fits, colors } = result[0];
                const productsWithColorsAndFits = products.map((product) => {
                    let updatedSizes;
                    let updatedFits;
                    let updatedColors;
                    if (product.type === "Jewellery") {
                        updatedSizes = ["One Size"];
                        updatedFits = ["Regular"];
                        updatedColors = ["Silver", "Gold"];
                    }
                    else {
                        updatedSizes = sizes;
                        updatedFits = fits;
                        updatedColors = colors;
                    }
                    switch (product.theme) {
                        case "Spring Vibe":
                            updatedColors = ["Black", "White"];
                            break;
                        case "Party":
                            updatedColors = ["Black", "Gold", "Silver"];
                            break;
                        // Add more cases for other themes if needed
                    }
                    return Object.assign(Object.assign({}, product.toObject()), { sizes: updatedSizes, fits: updatedFits, colors: updatedColors });
                });
                res.status(200).json({ products: productsWithColorsAndFits });
            }
            else {
                res.status(200).json({ products, sizes: [], fits: [], colors: [] });
            }
        })
            .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (!product)
            throw new Error("Product not found");
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_1.default({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        theme: req.body.theme,
        image: req.body.image,
        price: req.body.price,
    });
    try {
        const newProduct = yield product.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        if (product) {
            product.type = req.body.type || product.type;
            product.description = req.body.description || product.description;
            product.theme = req.body.theme || product.theme;
            product.image = req.body.image || product.image;
            product.price = req.body.price || product.price;
            const updatedProduct = yield product.save();
            res.json(updatedProduct);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProduct)
            throw new Error("Product not found");
        res.status(200).json(deletedProduct);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
