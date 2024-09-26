import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const res = await db.stock.findMany({
    include: {
      product: {
        include: {
          unit: true,
        }
      },
      warehouse: true,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
