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
exports.sendMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer = require("nodemailer");
function sendMessage(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, subject, message } = req.body;
        // Save message in db
        const newMessage = new message_1.default({
            email,
            name,
            subject,
            message,
        });
        yield newMessage.save();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: email,
            to: "contact.capsule.wardrobe@gmail.com",
            subject: "New Message from Contact Form",
            text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
        });
        console.log("Message sent: %s", info.messageId);
    });
}
exports.sendMessage = sendMessage;
