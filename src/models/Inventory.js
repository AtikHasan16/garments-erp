import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
  {
    itemCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. Fabric (Woven), Yarn, Trims
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }, // Yds, Kg, Gross, Pcs
    reorderLevel: { type: Number, required: true },
    supplier: { type: String, required: true },
    unitCost: { type: Number, required: true },
    location: { type: String, default: 'Warehouse Rack A1' },
    shadeLot: { type: String, default: 'LOT-101' },
    batchNo: { type: String, default: 'BATCH-2026' },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Critical', 'Out of Stock'],
      default: 'In Stock'
    }
  },
  { timestamps: true }
);

export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
