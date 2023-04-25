"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = void 0;
function validateMessage(req, res, next) {
    const { name, email, subject, message } = req.body;
    // Check if all required fields are present
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    // Call next middleware function or final handler function
    next();
}
exports.validateMessage = validateMessage;
