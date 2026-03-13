import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (data) => {
  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    const count = await Order.countDocuments();
    const orderCode = `ORD-${String(count + 1).padStart(3, '0')}`;

    try {
      const order = await Order.create({ ...data, orderCode });
      return order;
    } catch (err) {
      if (err?.code === 11000 && attempt < maxRetries) {
        continue;
      }
      throw err;
    }
  }

  throw new Error('Failed to create order after retries');
};

export const getOrdersWithPagination = async ({ page = 1, limit = 10 } = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (safePage - 1) * safeLimit;

  const [orders, total] = await Promise.all([
    Order.find().skip(skip).limit(safeLimit),
    Order.countDocuments(),
  ]);

  return {
    items: orders,
    total,
    page: safePage,
    limit: safeLimit,
    pages: Math.ceil(total / safeLimit),
  };
};

export const getMostOrderedProducts = async ({ limit = 10 } = {}) => {
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

  const results = await Order.aggregate([
    {
      $group: {
        _id: '$productId',
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { totalOrders: -1 } },
    { $limit: safeLimit },
    {
      $lookup: {
        from: Product.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
  ]);

  return results;
};

export const getMonthlyRevenue = async () => {
  const results = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        totalRevenue: { $sum: '$totalAmount' },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  return results;
};
