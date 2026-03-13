import Seller from '../models/Seller.js';

export const createSeller = async (data) => {
  const seller = await Seller.create(data);
  return seller;
};

export const getSellers = async ({ page = 1, limit = 10 } = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Seller.find().skip(skip).limit(safeLimit),
    Seller.countDocuments(),
  ]);

  return {
    success: true,
    data: items,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      pages: Math.ceil(total / safeLimit),
    },
  };
};
