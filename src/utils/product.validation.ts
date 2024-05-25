import { z } from 'zod';

const variantSchema = z.object({
  type: z.string(),
  value: z.union([z.string(), z.number()]),
});

const inventorySchema = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  variants: z.array(variantSchema).optional(),
  inventory: inventorySchema,
});

export default productSchema;
