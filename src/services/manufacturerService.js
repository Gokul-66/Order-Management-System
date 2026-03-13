import Manufacturer from '../models/Manufacturer.js';

export const createManufacturer = async (data) => {
  const manufacturer = await Manufacturer.create(data);
  return manufacturer;
};

export const getManufacturers = async ({ page = 1, limit = 10 } = {}) => {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    Manufacturer.find().skip(skip).limit(safeLimit),
    Manufacturer.countDocuments(),
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
