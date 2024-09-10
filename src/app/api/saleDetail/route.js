import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const saleDetails = await db.saleDetail.findMany();
  return NextResponse.json(saleDetails, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { sale_id, product_id, warehouse_id, quantity, price, discount } = data;
  const res = await db.saleDetail.create({
    data: {
      sale_id,
      product_id,
      warehouse_id,
      quantity,
      price,
      discount,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
