import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const res = await db.inventory.findMany();
  return NextResponse.json(res, { status: 200 });
}
