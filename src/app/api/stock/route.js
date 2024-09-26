import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const res = await db.stock.findMany();
  return NextResponse.json(res, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();

  const { product_id, warehouse_id, quantity } = data;

  const inventoryFound = await db.stock.findFirst({
    where: {
      AND: [{ product_id }, { warehouse_id }],
    },
  });

  if (inventoryFound) {
    // Update the quantity
    const res = await db.stock.update({
      where: {
        id: inventoryFound.id,
      },
      data: {
        quantity: inventoryFound.quantity + quantity,
      },
    });

    return NextResponse.json(
      res,
      { message: "Cantidad actualizada" },
      { status: 200 }
    );
  }

  const res = await db.stock.create({
    data: {
      product_id,
      warehouse_id,
      quantity,
    },
  });

  return NextResponse.json(
    res,
    { message: "Stock actualizado" },
    { status: 200 }
  );
}
