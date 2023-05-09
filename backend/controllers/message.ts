import { Request, Response } from "express";
import Message from "../models/message";
import dotenv from "dotenv";
dotenv.config();

const nodemailer = require("nodemailer");

export async function sendMessage(req: Request) {
  const { name, email, subject, message } = req.body;

  // Save message in db
  const newMessage = new Message({
    email,
    name,
    subject,
    message,
  });
  await newMessage.save();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
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
}
