import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Inventory from '../../../models/Inventory';
import ProductionLine from '../../../models/ProductionLine';
import Challan from '../../../models/Challan';
import { 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY, 
  INITIAL_LINES, 
  INITIAL_DELIVERY_CHALLANS 
} from '../../../data/mockErpData';

// POST /api/seed - Seed database with initial GarmentsOS sample records
export async function POST() {
  try {
    await connectToDatabase();

    // Clear existing data
    await Order.deleteMany({});
    await Inventory.deleteMany({});
    await ProductionLine.deleteMany({});
    await Challan.deleteMany({});

    // Seed mock data
    const orders = await Order.insertMany(INITIAL_ORDERS);
    const inventory = await Inventory.insertMany(INITIAL_INVENTORY);
    const lines = await ProductionLine.insertMany(INITIAL_LINES);
    const challans = await Challan.insertMany(INITIAL_DELIVERY_CHALLANS);

    return NextResponse.json({
      success: true,
      message: 'MongoDB Atlas database successfully seeded with initial GarmentsOS enterprise records.',
      counts: {
        orders: orders.length,
        inventory: inventory.length,
        lines: lines.length,
        challans: challans.length,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
