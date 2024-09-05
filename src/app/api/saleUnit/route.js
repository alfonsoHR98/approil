import { NextResponse } from "next/server";
import db from "@lib/db";

export async function POST(req) {
  const data = await req.json();
  const { name, value, unit } = data;
  return NextResponse.json({ message: "Registrando" }, { status: 200 });
}
