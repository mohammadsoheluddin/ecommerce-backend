import { Model } from 'mongoose';

export type TVariant = {
  type: string;
  value: string | number;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export interface ProductModel extends Model<TProduct> {
  isProductExist(id: string): Promise<TProduct | null>;
}
