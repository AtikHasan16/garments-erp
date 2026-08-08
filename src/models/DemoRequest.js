import mongoose from 'mongoose';

const DemoRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    factoryName: { type: String, required: true },
    monthlyCapacity: { type: String, default: '50,000 - 200,000 pcs' },
    status: { type: String, default: 'Pending Contact' }
  },
  { timestamps: true }
);

export default mongoose.models.DemoRequest || mongoose.model('DemoRequest', DemoRequestSchema);
