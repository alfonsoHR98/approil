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
    return NextResponse.json(inventory, { status: 200 });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json(
      { error: "Error fetching inventory" },
      { status: 500 }
    );
  }
}
