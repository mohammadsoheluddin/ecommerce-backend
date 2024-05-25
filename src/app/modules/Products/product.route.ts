import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/search', ProductControllers.searchProducts);
router.get('/:productId', ProductControllers.getProductById);
router.put('/:productId', ProductControllers.updateProduct);
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
