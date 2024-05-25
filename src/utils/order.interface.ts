import { Model } from 'mongoose';

export type TOrder = {
  email: string;
  productId?: string;
  price: number;
  quantity: number;
};

export interface ProductModel extends Model<TOrder> {
  isUserExist(id: string): Promise<TOrder | null>;
}
