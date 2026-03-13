import {
  createOrder as createOrderService,
  getOrdersWithPagination as getOrdersWithPaginationService,
  getMostOrderedProducts as getMostOrderedProductsService,
  getMonthlyRevenue as getMonthlyRevenueService,
} from '../services/orderService.js';

export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    return res.status(201).json({ success: true, data: order });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await getOrdersWithPaginationService({ page, limit });
    return res.status(200).json({
      success: true,
      data: result.items,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMostOrderedProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const result = await getMostOrderedProductsService({ limit });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {
    const result = await getMonthlyRevenueService();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
