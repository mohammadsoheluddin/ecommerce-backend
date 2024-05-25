import { Schema, model } from 'mongoose';
import { TOrder } from '../../../utils/order.interface';

const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Order = model<TOrder>('Order', OrderSchema);
