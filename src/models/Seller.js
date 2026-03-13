import mongoose from 'mongoose';

const { Schema } = mongoose;

const sellerSchema = new Schema(
  {
    sellerCode: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);


sellerSchema.pre('save', async function preSave(next) {
  if (this.sellerCode) return next();
  const count = await this.constructor.countDocuments();
  this.sellerCode = `SEL-${String(count + 1).padStart(3, '0')}`;
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
