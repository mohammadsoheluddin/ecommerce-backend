import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { TProduct } from '../../../utils/product.interface';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: TProduct = req.body;
    const product = await ProductServices.createProductIntoDB(productData);
    res.json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to create product' });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getAllProductsFromDB();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch products' });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await ProductServices.getSingleProductFromDBById(productId);
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch product' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData: TProduct = req.body;
    const updatedProduct = await ProductServices.updateProductInDBById(
      productId,
      productData,
    );
    if (updatedProduct) {
      res.json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct,
      });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to update product' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const deletedProduct =
      await ProductServices.deleteProductFromDBById(productId);
    if (deletedProduct) {
      res.json({
        success: true,
        message: 'Product deleted successfully!',
        data: deletedProduct,
      });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete product' });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    const products = await ProductServices.searchProductsFromDB(searchTerm);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to search products' });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
};
