import express from 'express';
import {
  createProduct,
  updateProductStatus,
  getFaultyProducts,
  getProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/faulty', getFaultyProducts);
router.patch('/:id/status', updateProductStatus);

export default router;
