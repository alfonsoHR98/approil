import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const batcheDetails = await db.batcheDetail.findMany();
  return NextResponse.json(batcheDetails, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { batche_id, product_id, quantity, price } = data;
  const res = await db.batcheDetail.create({
    data: {
      batche_id,
      product_id,
      quantity,
      price,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
