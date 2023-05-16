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
exports.deleteUser = exports.updateUser = exports.login = exports.signup = exports.getUserById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Encryption key and IV
const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_KEY, "hex");
const iv = Buffer.from(process.env.AES_IV, "hex");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "default_secret");
        if (typeof decoded === "string") {
            throw new Error("Invalid token");
        }
        const userId = decoded.user.id;
        console.log(userId);
        // Find user by ID
        const user = yield user_1.default.findById(userId);
        // Check if user exists
        if (!user) {
            return res.status(404).send("User not found");
        }
        // Decrypt payment card information
        const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
        let decryptedPaymentCard = decipher.update(user.payment_card, "hex", "utf8");
        decryptedPaymentCard += decipher.final("utf8");
        res.json({
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            payment_type: user.payment_type,
            payment_card: decryptedPaymentCard,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.getUserById = getUserById;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, first_name, last_name, address, payment_type, payment_card, } = req.body;
        // Check if user already exists
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user
        const newUser = new user_1.default({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            address,
        });
        // Add optional payment information if present
        if (payment_type && payment_card) {
            // Encrypt payment card information
            const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
            let encryptedPaymentCard = cipher.update(payment_card, "utf8", "hex");
            encryptedPaymentCard += cipher.final("hex");
            newUser.payment_type = payment_type;
            newUser.payment_card = encryptedPaymentCard;
        }
        // Save user to database
        yield newUser.save();
        // Set session variable
        req.session.user = { id: newUser.id };
        req.session.save();
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET || "default_secret");
        res.status(201).json({ token, newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user with provided email exists
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // Compare provided password with the hashed password in the database
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // Set session variable
        req.session.user = { id: user.id };
        req.session.save();
        console.log(req.session.user);
        // Create and send token
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: 86400 }, // Token expiration time in seconds
        (err, token) => {
            if (err)
                throw err;
            res.json({ token, user });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "default_secret");
        if (typeof decoded === "string") {
            throw new Error("Invalid token");
        }
        const userId = decoded.user.id;
        console.log(userId);
        // Find user by ID
        const user = yield user_1.default.findById(userId);
        // Check if user exists
        if (!user) {
            return res.status(404).send("User not found");
        }
        const { email, password, first_name, last_name, address, payment_type, payment_card, } = req.body;
        // If the password is being updated, hash it before updating it in the database
        let hashedPassword = password;
        if (password) {
            hashedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        // Encrypt payment card information
        const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
        let encryptedPaymentCard = cipher.update(payment_card, "utf8", "hex");
        encryptedPaymentCard += cipher.final("hex");
        const updatedUser = yield user_1.default.findByIdAndUpdate(req.params.id, {
            email,
            password: hashedPassword,
            first_name,
            last_name,
            address,
            payment_type,
            payment_card: encryptedPaymentCard,
        }, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "default_secret");
        if (typeof decoded === "string") {
            throw new Error("Invalid token");
        }
        const userId = decoded.user.id;
        console.log(userId);
        // Find user by ID
        const user = yield user_1.default.findById(userId);
        // Check if user exists
        if (!user) {
            return res.status(404).send("User not found");
        }
        yield user_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.deleteUser = deleteUser;
