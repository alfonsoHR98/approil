"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import { useInventory } from "@context/InventoryContext";

function Inventory() {
  const { inventories, loadInventories } = useInventory();

  React.useEffect(() => {
    loadInventories();
  }, []);

  return (
    <PageComponent tittle="Inventario">
      <TableComponent
        columns={[
          {
            key: "warehouse.name",
            label: "Almacén",
          },
          { key: "product.name", label: "Producto" },
          { key: "product.code", label: "Código" },
          { key: "quantity", label: "Cantidad" },
          { key: "price", label: "Precio" },
          { key: "totalValue", label: "Valor total" },
        ]}
        data={inventories ? inventories : []}
      />
    </PageComponent>
  );
}

export default Inventory;
