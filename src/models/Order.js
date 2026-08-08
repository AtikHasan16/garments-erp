import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    poNumber: { type: String, required: true, unique: true },
    styleCode: { type: String, required: true },
    styleName: { type: String, required: true },
    buyer: { type: String, required: true },
    garmentCategory: { type: String, default: 'T-Shirt' },
    orderQty: { type: Number, required: true },
    fobPrice: { type: Number, required: true },
    totalValue: { type: Number, required: true },
    shipmentDate: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['Sampling', 'PP Approved', 'In Cutting', 'In Sewing', 'Finishing', 'Shipped'],
      default: 'In Sewing' 
    },
    priority: { type: String, default: 'Medium' },
    factoryLine: { type: String, default: 'Line 01 (Floor A)' },
    cuttingProgress: { type: Number, default: 0 },
    sewingProgress: { type: Number, default: 0 },
    finishingProgress: { type: Number, default: 0 },
    samplingMilestones: {
      labDip: { type: Boolean, default: false },
      fitSample: { type: Boolean, default: false },
      ppSample: { type: Boolean, default: false },
      bulkFabricReceived: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
