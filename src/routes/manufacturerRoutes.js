import express from 'express';
import {
  createManufacturer,
  getManufacturers,
} from '../controllers/manufacturerController.js';

const router = express.Router();

router.post('/', createManufacturer);
router.get('/', getManufacturers);

export default router;
