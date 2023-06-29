import { Request, Response } from "express";
import Order, { IOrder } from "../models/order";
import Order_item, { IOrder_items } from "../models/order_item";
import Product_Variant from "../models/poduct_variant";
import { sendOrderConfirmationEmail } from "../middlewares/orderConfirmation";
import { sendOrderNotificationEmail } from "../middlewares/orderNotification";
import Product from "../models/product";

// Controller function for creating a new order
export async function createOrder(req: Request, res: Response) {
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
    const order_item: IOrder_items[] = await Promise.all(
      // Update this line
      items.map(async (item: any) => {
        const { product_variant_id, quantity, price, name } = item;
        return await Order_item.create({
          // Update this line
          order_id: order._id,
          product_variant_id,
          quantity,
          price,
          name,
        });
      })
    );
    const orderid = order._id.toString();

    // Fetch the related product variants
    const productVariantIds = order_item.map((item) => item.product_variant_id);
    const productVariants = await Product_Variant.find({
      _id: { $in: productVariantIds },
    }).exec();

    // Fetch the related products
    const productIds = productVariants.map((variant) => variant.product_id);
    const products = await Product.find({ _id: { $in: productIds } }).exec();

    // Send the order notification email
    await sendOrderNotificationEmail(
      order,
      order_item,
      products,
      productVariants
    );
    await sendOrderConfirmationEmail(
      email,
      order,
      order_item,
      products,
      productVariants
    );

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
    const userId = req.params.id;

    const orders = await Order.find({ user_id: userId }).populate("user_id");

    for (const order of orders) {
      const orderItems = await Order_item.find({
        order_id: order._id,
      }).populate("product_variant_id");

      order.order_items = orderItems.map((item) => item.product_variant_id);
    }

    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
