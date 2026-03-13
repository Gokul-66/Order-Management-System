import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import manufacturerRoutes from './routes/manufacturerRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error:', err);
    process.exit(1);
  });
