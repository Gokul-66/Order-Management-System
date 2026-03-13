import express from 'express';
import { createSeller, getSellers } from '../controllers/sellerController.js';

const router = express.Router();

router.post('/', createSeller);
router.get('/', getSellers);

export default router;
