import mongoose from 'mongoose';

const ChallanSchema = new mongoose.Schema(
  {
    challanNo: { type: String, required: true, unique: true },
    gatePassNo: { type: String, required: true, unique: true },
    buyer: { type: String, required: true },
    poNumber: { type: String, required: true },
    styleCode: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    totalCartons: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    dispatchDate: { type: String, required: true },
    destination: { type: String, required: true },
    status: {
      type: String,
      enum: ['Draft', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Out for Delivery'
    },
    items: [
      {
        itemCode: { type: String },
        description: { type: String },
        cartons: { type: Number },
        quantity: { type: Number }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Challan || mongoose.model('Challan', ChallanSchema);
