import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const saleUnits = await db.saleUnit.findMany();
  return NextResponse.json(saleUnits, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { name, value, unit } = data;
  const res = await db.saleUnit.create({
    data: {
      name,
      value,
      unit,
    },
  });
  return NextResponse.json(res, { status: 200 });
}

