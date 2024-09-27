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

  console.log(sales);
  const calculateTotal = (sale) => {
    const total = sale.SaleDetails.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    return total.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <PageComponent tittle="Ventas">
      <TableComponent
        columns={[
          {
            key: "createdAt",
            label: "Fecha",
          },
          {
            key: "Client.name",
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
            key: "total",
            label: "Total",
          },
          {
            key: "actions",
            label: "Acciones",
          },
        ]}
        data={sales}
        rowNumber={6}
        removeItem={removeSale}
        calculateTotal={calculateTotal}
        route="sale"
      />
    </PageComponent>
  );
}

export default Sale;