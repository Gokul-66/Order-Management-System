import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    customerCode: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);


customerSchema.pre('save', async function preSave(next) {
  if (this.customerCode) return next();
  const count = await this.constructor.countDocuments();
  this.customerCode = `CUST-${String(count + 1).padStart(3, '0')}`;
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
