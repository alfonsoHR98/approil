"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import { useBatche } from "@context/BatcheContext";
import { useParams } from "next/navigation";

function BatcheDetail() {
  const params = useParams();
  const [batche, setBatche] = React.useState(null);
  const { getBatcheDetail } = useBatche();

  React.useEffect(() => {
    async function fetchData() {
      const res = await getBatcheDetail(params.id);
      setBatche(res);
    }
    fetchData();
  }, []);

  const totalAmount = batche?.BatcheDetail?.reduce(
    (sum, detail) => sum + detail.quantity * detail.price,
    0
  );
  return (
    <PageComponent tittle="Detalle de compra">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="px-4">
          <h3 className="text-xl font-semibold my-2">
            {batche?.supplierType === "SUPPLIER" ? "Proveedor" : "Almacén"}
          </h3>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Nombre:</span>{" "}
            {batche?.supplierType === "SUPPLIER"
              ? batche?.supplier.name
              : batche?.sup_warehouse.name}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Teléfono:</span>{" "}
            {batche?.supplierType === "SUPPLIER"
              ? batche?.supplier.phone
              : batche?.sup_warehouse.phone}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Email:</span>{" "}
            {batche?.supplierType === "SUPPLIER"
              ? batche?.supplier.email
              : batche?.sup_warehouse.email}
          </p>
        </div>

        <div className="px-4 mt-2">
          <h3 className="text-lg font-semibold my-2">
            Información de la compra
          </h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Producto</th>
                <th className="py-2">Cantidad</th>
                <th className="py-2">Precio Unitario</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {batche?.BatcheDetail?.map((detail) => (
                <tr key={detail.id}>
                  <td className="border px-4 py-2 flex flex-col">
                    {detail.product.name}{" "}
                    <span className="text-xs text-neutral-500">
                      {detail.product.code}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{detail.quantity}</td>
                  <td className="border px-4 py-2">
                    ${detail.price.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    ${(detail.quantity * detail.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <span className="font-bold">Total de la compra: </span>
            <span>${totalAmount?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}

export default BatcheDetail;
