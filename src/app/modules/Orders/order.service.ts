import { Order } from './order.model';
import { Product } from '../Products/product.model';
import { TOrder } from '../../../utils/order.interface';

const createOrderIntoDB = async (orderData: TOrder) => {
  const { email, productId, price, quantity } = orderData;

  // Validate product ID and check inventory
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Order not found');
  }

  if (product.inventory.quantity < quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // Create the new order
  const newOrder = new Order({ email, productId, price, quantity });
  const savedOrder = await newOrder.save();

  // Update the product inventory
  product.inventory.quantity -= quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return savedOrder;
};

// Get All Orders
const getAllOrdersFromDB = async () => {
  const orders = await Order.find();
  return orders;
};

const getOrdersByEmailFromDB = async (email: string) => {
  // Use RegExp to match exact email, case-insensitive
  const emailRegex = new RegExp(`^${email}$`, 'i');
  const orders = await Order.find({ email: emailRegex });
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
