import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import Inventory from "../../../models/Inventory";

// GET /api/inventory - Fetch all raw material items
export async function GET() {
  try {
    await connectToDatabase();
    const inventory = await Inventory.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: inventory });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// POST /api/inventory - Log new fabric / yarn arrival
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newItem = await Inventory.create(body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
