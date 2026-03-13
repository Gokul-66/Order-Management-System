import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderCode: {
      type: String,
      unique: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

orderSchema.index({ productId: 1 });
orderSchema.index({ sellerId: 1 });
orderSchema.index({ customerId: 1 });
orderSchema.index({ createdAt: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
