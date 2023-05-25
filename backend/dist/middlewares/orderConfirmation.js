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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderConfirmationEmail = void 0;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
function sendOrderConfirmationEmail(userEmail, order, orderItems, Product, product_Variant) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        let orderDetails = "";
        orderItems.forEach((item, index) => {
            const product = Product.find((product) => {
                var _a;
                return product._id.toString() ===
                    (((_a = product_Variant[index]) === null || _a === void 0 ? void 0 : _a.product_id) || "").toString();
            });
            const variant = product_Variant[index];
            orderDetails += `
    <tr>
      <td>${product === null || product === void 0 ? void 0 : product.type}</td>
      <td>${product === null || product === void 0 ? void 0 : product.description}</td>
      <td>${variant === null || variant === void 0 ? void 0 : variant.color}</td>
      <td>${variant === null || variant === void 0 ? void 0 : variant.fit}</td>
      <td>${variant === null || variant === void 0 ? void 0 : variant.size}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
    </tr>
    `;
        });
        const mailOptions = {
            from: "noreply.capsule.wardrobe@gmail.com",
            to: userEmail,
            subject: "Order Confirmation",
            html: `   <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
        }
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 20px;
        }        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 20px;
        }
        th, td {
          text-align: left;
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body><h1>Thank you for your order!</h1> <p>Your order ID is ${order._id}.<table>    <thead>
    <tr>
      <th>Product</th>
      <th>Description</th>
      <th>Color</th>
      <th>Fit</th>
      <th>Size</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    ${orderDetails}
  </tbody>
</table></body></html>`,
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log("Order confirmation email sent");
        }
        catch (error) {
            console.error("Error sending order confirmation email:", error);
        }
    });
}
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
