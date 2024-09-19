import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req, { params }) {
  const id = params.id;

  const batche = await db.batche.findUnique({
    where: { id },
    include: {
      BatcheDetail: {
        include: {
          product: true,
        },
      },
      sup_warehouse: true,
      supplier: true,
      warehouse: true,
    },
  });

  if (!batche) {
    return NextResponse.json({ message: "Lote no encontrado" }, { status: 404 });
  }

  return NextResponse.json(batche, { status: 200 });
}

export async function DELETE(req, { params }) {
  const id = params.id;

  // Buscar el lote y sus detalles
  const batche = await db.batche.findUnique({
    where: { id },
    include: {
      BatcheDetail: true,
    },
  });

  if (!batche) {
    return NextResponse.json(
      { message: "Lote no encontrado" },
      { status: 404 }
    );
  }

  // Actualizar el inventario
  for (const detail of batche.BatcheDetail) {
    await db.inventory.updateMany({
      where: {
        product_id: detail.product_id,
        warehouse_id: batche.warehouse_id,
      },
      data: {
        quantity: {
          decrement: detail.quantity,
        },
      },
    });
  }

  // Eliminar el lote
  const res = await db.batche.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(res, { status: 200 });
}
