import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import DemoRequest from '../../../models/DemoRequest';

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const newDemoRequest = await DemoRequest.create(body);
    return NextResponse.json({ success: true, data: newDemoRequest }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
