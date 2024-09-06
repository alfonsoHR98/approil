import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const suppliers = await db.supplier.findMany();
  return NextResponse.json(suppliers, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { name, address, rfc, email, phone } = data;
  
  const supplierFound = await db.supplier.findFirst({
    where: {
      rfc,
    },
  });

  if (supplierFound) {
    return NextResponse.json(
      { message: "Supplier with this rfc already exists" },
      { status: 400 }
    );
  }

  const res = await db.supplier.create({
    data: {
      name,
      address,
      rfc,
      email,
      phone,
    },
  });
  
  return NextResponse.json(res, { status: 200 });
}
