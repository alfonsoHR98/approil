import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const batches = await db.batche.findMany({
    include: {
      supplier: true,
      warehouse: true,
      BatcheDetail: {
        include: {
          product: true,
        },
      },
    },
  });
  return NextResponse.json(batches, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const {
    supplier_id = null,
    sup_warehouse_id = null,
    warehouse_id,
    supplierType,
    bill,
  } = data;
  const res = await db.batche.create({
    data: {
      supplier_id,
      sup_warehouse_id,
      warehouse_id,
      supplierType,
      bill,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
