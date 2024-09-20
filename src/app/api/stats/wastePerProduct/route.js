import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const wasteData = await db.waste.groupBy({
    by: ["product_id"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 10, // Obtenemos los 10 productos con más desperdicio
  });

  // Obtener los detalles del producto para cada product_id
  const productIds = wasteData.map((waste) => waste.product_id);
  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Mapear los datos de desperdicio con los detalles del producto
  const result = wasteData.map((waste) => {
    const product = products.find((p) => p.id === waste.product_id);
    return {
      productName: product.name,
      productCode: product.code,
      totalWaste: waste._sum.quantity,
    };
  });

  return NextResponse.json(result);
}
