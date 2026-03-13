import express from 'express';
import {
  createOrder,
  getOrders,
  getMostOrderedProducts,
  getMonthlyRevenue,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/reports/most-ordered-products', getMostOrderedProducts);
router.get('/reports/monthly-revenue', getMonthlyRevenue);

export default router;
