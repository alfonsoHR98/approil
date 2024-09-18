import { NextResponse } from "next/server";
import db from "@lib/db";

export async function DELETE(req, { params }) {
  const id = params.id;

  // Buscar la venta y sus detalles
  const sale = await db.sale.findUnique({
    where: { id },
    include: {
      SaleDetail: true,
    },
  });

  if (!sale) {
    return NextResponse.json({ error: "Venta no encontrada" }, { status: 404 });
  }

  // Actualizar el inventario
  for (const detail of sale.SaleDetail) {
    await db.inventory.updateMany({
      where: {
        product_id: detail.product_id,
        warehouse_id: detail.warehouse_id,
      },
      data: {
        quantity: {
          increment: detail.quantity,
        },
      },
    });
  }

  // Eliminar la venta
  const res = await db.sale.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(res, { status: 200 });
}
