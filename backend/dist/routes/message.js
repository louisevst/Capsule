"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = require("../controllers/message");
const message_2 = require("../middlewares/message");
const router = express_1.default.Router();
router.post("/", message_2.validateMessage, message_1.sendMessage);
exports.default = router;
