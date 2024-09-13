import { NextResponse } from "next/server";
import db from "@lib/db";

export async function POST(req) {
  const data = await req.json();
  const { product_id, warehouse_id, quantity } = data;

  const foundRegister = await db.inventory.findFirst({
    where: {
      AND: [{ product_id: product_id }, { warehouse_id: warehouse_id }],
    },
  });

  if (foundRegister) {
    const updatedRegister = await db.inventory.update({
      where: {
        id: foundRegister.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
    return NextResponse.json(updatedRegister, { status: 200 });
  } else {
    const newRegister = await db.inventory.create({
      data: {
        product_id,
        warehouse_id,
        quantity,
      },
    });
    return NextResponse.json(newRegister, { status: 200 });
  }
}
