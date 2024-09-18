"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import { useSale } from "@context/SaleContext";

function Sale() {
  const { sales, loadSales, removeSale } = useSale();

  React.useEffect(() => {
    loadSales();
  }, []);

  return (
    <PageComponent tittle="Ventas">
      <TableComponent
        columns={[
          {
            key: "client.name",
            label: "Cliente",
          },
          {
            key: "bill",
            label: "Factura",
          },
          {
            key: "account",
            label: "Cuenta contable",
          },
          {
            key: "saleType",
            label: "Tipo de venta",
          },
          {
            key: "actions",
            label: "Acciones",
          },
        ]}
        data={sales}
        rowNumber={10}
        removeItem={removeSale}
        route="sale"
      />
    </PageComponent>
  );
}

export default Sale;
