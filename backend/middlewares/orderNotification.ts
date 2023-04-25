const nodemailer = require("nodemailer");
import dotenv from "dotenv";
import Order from "../models/order";
import Order_item from "../models/order_item";
import Product_Variant from "../models/poduct_variant";
dotenv.config();

export async function sendOrderNotificationEmail(orderId: string) {
  const orderDetails = await getOrderDetails(orderId);

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "contact.capsule.wardrobe@gmail.com",
    to: "contact.capsule.wardrobe@gmail.com",
    subject: "New order !",
    text: `A customer just placed an order! The order ID is ${orderId}. Here are the details of the order: ${JSON.stringify(
      orderDetails
    )}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order notification email sent");
  } catch (error) {
    console.error("Error sending order notification email:", error);
  }
}

async function getOrderDetails(orderId: string) {
  const order = await Order.findById(orderId).populate({
    path: "order_items",
    populate: {
      path: "product_variant_id",
      model: Product_Variant,
      populate: {
        path: "product_id",
        model: "Product",
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const orderItems = order.order_items.map((item: any) => {
    const { _id, quantity, price, product_variant_id } = item;
    const { color, fit, size, images, product_id } = product_variant_id;
    const { type, description, theme, image } = product_id;
    return {
      _id,
      quantity,
      price,
      color,
      fit,
      size,
      images,
      type,
      description,
      theme,
      image,
    };
  });

  return {
    _id: order._id,
    user_id: order.user_id,
    date_ordered: order.date_ordered,
    total_price: order.total_price,
    order_items: orderItems,
  };
}
