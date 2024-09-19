"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import { useBatche } from "@context/BatcheContext";

function Batche() {
  const { batches, loadBatches, removeBatche } = useBatche();

  React.useEffect(() => {
    loadBatches();
  }, []);

  const calculateTotal = (batche) => {
    const total = batche.BatcheDetail.reduce((total, detail) => {
      return total + detail.quantity * detail.price;
    }, 0);

    return total.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <PageComponent tittle="Compras">
      <TableComponent
        columns={[
          {
            key: "createdAt",
            label: "Fecha",
          },
          {
            key: "supplier.name",
            label: "Proveedor",
          },
          {
            key: "warehouse.name",
            label: "Almacén",
          },
          {
            key: "bill",
            label: "Factura",
          },
          {
            key: "total",
            label: "Total",
          },
          {
            key: "actions",
            label: "Acciones",
          },
        ]}
        data={batches}
        rowNumber={10}
        removeItem={removeBatche}
        calculateTotal={calculateTotal}
        route="batche"
      />
    </PageComponent>
  );
}

export default Batche;
