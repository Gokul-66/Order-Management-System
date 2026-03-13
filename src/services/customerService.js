import Customer from '../models/Customer.js';

export const createCustomer = async (data) => {
  const customer = await Customer.create(data);
  return customer;
};

export const getCustomers = async ({ page = 1, limit = 10 } = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Customer.find().skip(skip).limit(safeLimit),
    Customer.countDocuments(),
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
