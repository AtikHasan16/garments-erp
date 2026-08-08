import mongoose from 'mongoose';

const ProductionLineSchema = new mongoose.Schema(
  {
    lineName: { type: String, required: true, unique: true },
    floor: { type: String, required: true },
    supervisor: { type: String, required: true },
    assignedStyle: { type: String, required: true },
    buyer: { type: String, required: true },
    targetOutput: { type: Number, required: true },
    actualOutput: { type: Number, required: true },
    efficiencyPercent: { type: Number, required: true },
    activeWorkers: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Optimal', 'Warning', 'Bottleneck', 'Idle'],
      default: 'Optimal'
    },
    bottleneckReason: { type: String, default: null },
    hourlyOutput: [{ type: Number }]
  },
  { timestamps: true }
);

export default mongoose.models.ProductionLine || mongoose.model('ProductionLine', ProductionLineSchema);
