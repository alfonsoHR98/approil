import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  try {
    const inventory = await db.inventory.findMany({
      include: {
        product: {
          include: {
            unit: true, // Incluir la información de la unidad
          },
        },
        warehouse: true,
      },
    });

    const response = NextResponse.json(inventory, { status: 200 });

    // Añadir encabezados para deshabilitar la caché
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json(
      { error: "Error fetching inventory" },
      { status: 500 }
    );
  }
}
