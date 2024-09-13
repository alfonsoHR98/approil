import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const sales = await db.sale.findMany({
    include: {
      client: true,
    },
  });
  return NextResponse.json(sales, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { client_id = null, warehouse_id = null, saleType, bill, account } = data;
  const res = await db.sale.create({
    data: {
      client_id,
      warehouse_id,
      saleType,
      bill,
      account,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
