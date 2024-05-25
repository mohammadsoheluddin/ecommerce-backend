import { Request, Response } from 'express';
import { Order } from './order.model';
import { Product } from '../Products/product.model';
import { orderValidationSchema } from '../../../utils/order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate the incoming request body
    const result = orderValidationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: result.error.errors.map((err) => err.message),
      });
    }

    const { email, productId, price, quantity } = result.data;

    // Validate product ID and check inventory
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Create the new order
    const newOrder = new Order({ email, productId, price, quantity });
    const savedOrder = await newOrder.save();

    // Update the product inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: savedOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email provided',
      });
    }

    const orders = await Order.find({ email: email });
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders by email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders by email',
      error: error.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};
