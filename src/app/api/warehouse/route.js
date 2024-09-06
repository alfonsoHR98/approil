import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const res = await db.warehouse.findMany();
  return NextResponse.json(res, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { name, address, email, phone } = data;
  const res = await db.warehouse.create({
    data: {
      name,
      address,
      email,
      phone,
    },
  });
  return NextResponse.json(res, { status: 200 });
}