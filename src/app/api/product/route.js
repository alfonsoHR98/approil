import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const products = await db.product.findMany({
    include: {
      unit: true,
    },
  });
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { name, descrip, brand, code, unit_id } = data;

  const productFound = await db.product.findFirst({
    where: {
      code,
    },
  });

  if (productFound) {
    return NextResponse.json(
      { message: "Product with this code already exists" },
      { status: 400 }
    );
  }

  const res = await db.product.create({
    data: {
      name,
      descrip,
      brand,
      code,
      unit_id,
    },
  });
  return NextResponse.json(res, { status: 200 });
}
