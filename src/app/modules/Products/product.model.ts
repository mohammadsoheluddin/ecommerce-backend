import { Schema, model } from 'mongoose';
import {
  TProduct,
  TVariant,
  TInventory,
  ProductModel,
} from '../../../utils/product.interface';

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true }, // Schema.Types.Mixed allows for both string and number
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

ProductSchema.statics.isProductExist = async function (id: string) {
  return this.findById(id).exec();
};

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
