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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        // Retrieve user ID from session variable
        const userId = req.session.user.id;
        // Find user by ID
        const user = yield user_1.default.findById(req.params.id);
        // Check if user exists and matches the logged-in user
        if (!user || user.id !== userId) {
            return res.status(404).send("User not found");
        }
        res.json(user);
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
        // check if user already exists
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // create new user
        const newUser = new user_1.default({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            address,
            payment_type,
            payment_card,
        });
        // save user to database
        yield newUser.save();
        // Set session variable
        req.session.user = { id: newUser.id };
        // create JWT token
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET || "default_secret");
        res.status(201).json({ token });
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
            res.json({ token });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        // Retrieve user ID from session variable
        const userId = req.session.user.id;
        const { email, password, first_name, last_name, address, payment_type, payment_card, } = req.body;
        // If the password is being updated, hash it before updating it in the database
        let hashedPassword = password;
        if (password) {
            hashedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        const user = yield user_1.default.findById(req.params.id);
        // Check if user exists and matches the logged-in user
        if (!user || user.id !== userId) {
            return res.status(404).send("User not found");
        }
        const updatedUser = yield user_1.default.findByIdAndUpdate(req.params.id, {
            email,
            password: hashedPassword,
            first_name,
            last_name,
            address,
            payment_type,
            payment_card,
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
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        // Retrieve user ID from session variable
        const userId = req.session.user.id;
        const user = yield user_1.default.findById(req.params.id);
        // Check if user exists and matches the logged-in user
        if (!user || user.id !== userId) {
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
