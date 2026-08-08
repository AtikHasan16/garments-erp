import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import ProductionLine from '../../../models/ProductionLine';

// GET /api/production - Fetch all floor production lines
export async function GET() {
  try {
    await connectToDatabase();
    const lines = await ProductionLine.find({}).sort({ lineName: 1 });
    return NextResponse.json({ success: true, data: lines });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
