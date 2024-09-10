import { NextResponse } from "next/server";
import db from "@lib/db"

export async function GET(req) {
  const inventory = await db.inventory.findMany();
  return NextResponse.json(inventory, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const {
    product_id,
    warehouse_id,
    quantity,
  } = data;
  const res = await db.inventory.create({
    data: {
      product_id,
      warehouse_id,
      quantity,
    },
  });
  return NextResponse.json(res, { status: 200 });
}