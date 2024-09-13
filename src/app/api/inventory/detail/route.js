// pages/api/inventory.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const inventoryData = await prisma.inventory.findMany({
      include: {
        product: true, // Información del producto
        warehouse: true, // Información del almacén
      },
    });

    const inventoryResponse = await Promise.all(
      inventoryData.map(async (item, index) => {
        // Obtener todos los batches para este producto y almacén
        const batches = await prisma.batche.findMany({
          where: {
            warehouse_id: item.warehouse_id, // Almacén
            BatcheDetail: {
              some: {
                product_id: item.product_id, // Producto
              },
            },
          },
          include: {
            BatcheDetail: true, // Incluir los detalles del batch
          },
        });

        // Calcular el precio promedio basado en la cantidad de compras
        const batcheDetails = batches.flatMap((batch) => batch.BatcheDetail);

        const averagePrice =
          batcheDetails.reduce(
            (total, batcheDetail) => total + batcheDetail.price,
            0
          ) / batcheDetails.length || 0;

        return {
          id: index, // Añadir un índice único como key
          product: item.product, // Información del producto
          warehouse: item.warehouse, // Información del almacén
          quantity: item.quantity, // Cantidad registrada en el inventario
          price: averagePrice.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          }), // Precio promedio (0 si no hay detalles)
          totalValue: (
            item.quantity * averagePrice
          ).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          }), // Valor total del
        };
      })
    );

    return NextResponse.json(inventoryResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener el inventario" },
      { status: 500 }
    );
  }
}
