import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const products = await db.saleDetail.groupBy({
    by: ["product_id"],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },
    take: 10,
  });

  const productIds = products.map((product) => product.product_id);

  const productData = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    include: {
      unit: true, // Incluir los datos de unit_id
    },
  });

  const response = productData.map((product) => {
    const productInfo = products.find((item) => item.product_id === product.id);

    return {
      product: product,
      quantity: productInfo._sum.quantity,
      unit: product.unit, // Incluir los datos de unit_id en la respuesta
    };
  });

  return NextResponse.json(response);
}
