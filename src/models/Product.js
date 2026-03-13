import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productCode: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturerId: {
      type: Schema.Types.ObjectId,
      ref: 'Manufacturer',
      required: true,
    },
    status: {
      type: String,
      enum: ['instock', 'outofstock', 'faulty'],
      default: 'instock',
    },
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
    },
    updatedByType: {
      type: String,
      enum: ['manufacturer', 'seller'],
    },
  },
  { timestamps: true }
);

productSchema.index({ manufacturerId: 1 });
productSchema.index({ status: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
