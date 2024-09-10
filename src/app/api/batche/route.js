import { NextResponse } from "next/server";
import db from "@lib/db"

export async function GET(req) {
  const batches = await db.batche.findMany();
  return NextResponse.json(batches, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const {
    supplier_id,
    sup_warehouse_id,
    warehouse_id,
    supplierType,
    date
  } = data;
  const res = await db.batche.create({
    data: {
      supplier_id,
      sup_warehouse_id,
      warehouse_id,
      supplierType,
      date
    },
  });
  return NextResponse.json(res, { status: 200 });
}