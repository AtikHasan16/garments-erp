import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Challan from '../../../models/Challan';

// GET /api/logistics - Fetch all delivery challans
export async function GET() {
  try {
    await connectToDatabase();
    const challans = await Challan.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: challans });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/logistics - Create new delivery challan gate pass
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newChallan = await Challan.create(body);
    return NextResponse.json({ success: true, data: newChallan }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
