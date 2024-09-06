import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const saleUnits = await db.saleUnit.findMany();
  return NextResponse.json(saleUnits, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { name, value, unit } = data;
  return NextResponse.json({ message: "Registrando" }, { status: 200 });
}
