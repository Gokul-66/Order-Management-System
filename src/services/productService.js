import Product from '../models/Product.js';
import Seller from '../models/Seller.js';
import Manufacturer from '../models/Manufacturer.js';

const VALID_UPDATED_BY_TYPES = ['seller', 'manufacturer'];

export const createProduct = async (data) => {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    const count = await Product.countDocuments();
    const productCode = `PROD-${String(count + 1).padStart(3, '0')}`;

    try {
      const product = await Product.create({ ...data, productCode });
      return product;
    } catch (err) {
      if (err?.code === 11000 && attempt < maxRetries) {
        continue;
      }
      throw err;
    }
  }

  throw new Error('Failed to create product after retries');
};

export const updateProductStatus = async (
  productId,
  status,
  updatedByType,
  updatedById
) => {
  if (!VALID_UPDATED_BY_TYPES.includes(updatedByType)) {
    throw new Error("updatedByType must be either 'seller' or 'manufacturer'");
  }

  if (updatedByType === 'seller') {
    const sellerExists = await Seller.exists({ _id: updatedById });
    if (!sellerExists) {
      throw new Error('Seller not found');
    }
  }

  if (updatedByType === 'manufacturer') {
    const manufacturerExists = await Manufacturer.exists({ _id: updatedById });
    if (!manufacturerExists) {
      throw new Error('Manufacturer not found');
    }
  }

  const product = await Product.findByIdAndUpdate(
    productId,
    {
      status,
      lastUpdatedBy: updatedById,
      updatedByType,
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

export const getFaultyProducts = async ({
  page = 1,
  limit = 10,
} = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (safePage - 1) * safeLimit;

  const [products, total] = await Promise.all([
    Product.find({ status: 'faulty' }).skip(skip).limit(safeLimit),
    Product.countDocuments({ status: 'faulty' }),
  ]);

  return {
    items: products,
    total,
    page: safePage,
    limit: safeLimit,
    pages: Math.ceil(total / safeLimit),
  };
};

export const getProducts = async ({ page = 1, limit = 10 } = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (safePage - 1) * safeLimit;

  const [products, total] = await Promise.all([
    Product.find().skip(skip).limit(safeLimit),
    Product.countDocuments(),
  ]);

  return {
    items: products,
    total,
    page: safePage,
    limit: safeLimit,
    pages: Math.ceil(total / safeLimit),
  };
};
