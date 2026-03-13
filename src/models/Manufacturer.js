import mongoose from 'mongoose';

const { Schema } = mongoose;

const manufacturerSchema = new Schema(
  {
    manufacturerCode: {
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


manufacturerSchema.pre('save', async function () {
  if (this.manufacturerCode) return;
  const count = await this.constructor.countDocuments();
  this.manufacturerCode = `MFR-${String(count + 1).padStart(3, '0')}`;
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

export default Manufacturer;
