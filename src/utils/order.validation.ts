import { z } from 'zod';

export const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

export default orderValidationSchema;
