import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET() {
  const res = await db.inventory.findMany();
  console.log(res);
  return NextResponse.json(res, { status: 200 });
}
