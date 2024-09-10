import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(rep) {
  const res = await db.waste.findMany();
  return NextResponse.json(res, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { product_id, warehouse_id, quantity, reason, date } = data;
  const res = await db.waste.create({
    data: {
      product_id,
      warehouse_id,
      quantity,
      reason,
      date,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
