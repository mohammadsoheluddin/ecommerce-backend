import { Product } from './product.model';
import { TProduct } from '../../../utils/product.interface';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDBById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const deleteProductFromDBById = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const updateProductInDBById = async (
  productId: string,
  productData: TProduct,
) => {
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  return result;
};

const searchProductsFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'iphone');
  const result = await Product.find({ name: { $regex: regex } });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDBById,
  deleteProductFromDBById,
  updateProductInDBById,
  searchProductsFromDB,
};
