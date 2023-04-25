import { Request, Response } from "express";
import Order from "../models/order";
import Order_item from "../models/order_item";
import Product_Variant from "../models/poduct_variant";
import { sendOrderConfirmationEmail } from "../middlewares/orderConfirmation";
import { sendOrderNotificationEmail } from "../middlewares/orderNotification";

// Controller function for creating a new order
export async function createOrder(req: Request, res: Response) {
  console.log(Order);
  try {
    const { user_id, items, email } = req.body;

    // Calculate the total price of the order
    const total_price = items.reduce(
      (acc: number, item: any) => acc + item.quantity * item.price,
      0
    );

    // Create a new order document in the database
    const order = await Order.create({ user_id, total_price });

    // Create order item documents in the database
    const order_item: (typeof Order_item)[] = await Promise.all(
      items.map(async (item: any) => {
        const { product_variant_id, quantity, price } = item;
        return await Order_item.create({
          order_id: order._id,
          product_variant_id,
          quantity,
          price,
        });
      })
    );
    const orderid = order._id.toString();
    await sendOrderConfirmationEmail(email, orderid);
    await sendOrderNotificationEmail(orderid);

    res.status(201).json({ order, order_item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Controller function for retrieving all orders
export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find({}).populate("user_id");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Controller function for retrieving a single order and its order items
export async function getOrder(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("user_id");

    const order_item = await Order_item.find({
      order_id: orderId,
    }).populate("product_variant_id");
    res.json({ order, order_item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
