import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Order from '../../../models/Order';

// GET /api/orders - Fetch all buyer purchase orders
export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new buyer purchase order (MongoDB Atlas INSERT)
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { poNumber, styleCode, styleName, buyer, orderQty, fobPrice, shipmentDate } = body;

    if (!poNumber || !styleCode || !styleName || !buyer || !orderQty || !fobPrice || !shipmentDate) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const totalValue = Number(orderQty) * Number(fobPrice);

    const newOrder = await Order.create({
      ...body,
      totalValue,
    });

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE /api/orders?id=... - Delete a purchase order by ID (MongoDB Atlas DELETE)
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    await Order.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
