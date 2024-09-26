import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET() {
  const res = await db.inventory.findMany({
    include: {
      product: {
        include: {
          unit: true, // Incluir la información de la unidad
        },
      },
      warehouse: true,
    },
  });
  console.log(res);
  return NextResponse.json(res, {
    status: 200,
    headers: { "Cache-Control": "no-store" },
  });

}
