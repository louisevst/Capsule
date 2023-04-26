const nodemailer = require("nodemailer");
import dotenv from "dotenv";
import Order, { IOrder } from "../models/order";
import Order_item, { IOrder_items } from "../models/order_item";
import Product_Variant, { IProductVariant } from "../models/poduct_variant";
import Product, { IProduct } from "../models/product";
dotenv.config();

export async function sendOrderNotificationEmail(
  order: IOrder,
  orderItems: IOrder_items[],
  Product: IProduct[],
  product_Variant: IProductVariant[]
) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let orderDetails = "";

  orderItems.forEach((item, index) => {
    const product = Product.find(
      (product) =>
        product._id.toString() === product_Variant[index].product_id.toString()
    );
    const variant = product_Variant[index];

    orderDetails += `
    <tr>
      <td>${product?.type}</td>
      <td>${product?.description}</td>
      <td>${variant.color}</td>
      <td>${variant.fit}</td>
      <td>${variant.size}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
    </tr>
    `;
  });

  const mailOptions = {
    from: "noreply.capsule.wardrobe@gmail.com",
    to: "contact.capsule.wardrobe@gmail.com",
    subject: "New order !",
    html: `<html>
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
        }
        table {
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
    <body><h1>A customer just placed an order!</h1> <p>The order ID is ${order._id}.</p>  
    <table>
    <thead>
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
    await transporter.sendMail(mailOptions);
    console.log("Order notification email sent");
  } catch (error) {
    console.error("Error sending order notification email:", error);
  }
}
