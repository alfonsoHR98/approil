// pages/api/inventory.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todos los datos de inventario junto con el producto y el almacén
    const inventoryData = await prisma.inventory.findMany({
      include: {
        product: true, // Información del producto
        warehouse: true, // Información del almacén
      },
    });

    // Obtener todos los batches y sus detalles relacionados con los productos y almacenes
    const batches = await prisma.batche.findMany({
      include: {
        BatcheDetail: true, // Incluir los detalles del batch
      },
    });

    // Procesar los datos del inventario y calcular el precio promedio
    const inventoryResponse = inventoryData.map((item, index) => {
      // Filtrar los batches correspondientes al almacén actual
      const relevantBatches = batches.filter(
        (batch) => batch.warehouse_id === item.warehouse_id
      );

      // Filtrar los detalles de batch para el producto actual en este almacén
      const relevantBatcheDetails = relevantBatches
        .flatMap((batch) => batch.BatcheDetail)
        .filter((detail) => detail.product_id === item.product_id);

      // Calcular el precio promedio solo de los batches que corresponden a este producto
      const averagePrice =
        relevantBatcheDetails.reduce(
          (total, detail) => total + detail.price,
          0
        ) / relevantBatcheDetails.length || 0;

      // obtener la cantidad total de productos en el inventario
      const totalQuantity = relevantBatcheDetails.reduce(
        (total, detail) => total + detail.quantity,
        0
      );

      // Devolver la información del inventario con el precio promedio calculado
      return {
        id: index, // Añadir un índice único como clave
        product: item.product, // Información del producto
        warehouse: item.warehouse, // Información del almacén
        quantity: item.quantity, // Cantidad registrada en el inventario
        price: averagePrice, // Precio promedio (0 si no hay detalles)
        totalValue: item.quantity * averagePrice, // Valor total
      };
    });

    return NextResponse.json(inventoryResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener el inventario" },
      { status: 500 }
    );
  }
}
