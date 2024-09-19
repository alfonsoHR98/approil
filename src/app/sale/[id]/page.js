"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import { useSale } from "@context/SaleContext";
import { useParams } from "next/navigation";

function SaleDetail() {
  const params = useParams();
  const [sale, setSale] = React.useState(null);
  const { getSaleDetail } = useSale();

  React.useEffect(() => {
    async function fetchData() {
      const res = await getSaleDetail(params.id);
      setSale(res);
    }
    fetchData();
  }, [params.id]);

  const totalAmount = sale?.SaleDetail?.reduce(
    (sum, detail) => sum + detail.quantity * detail.price,
    0
  );

  const totalAmountWithDiscount = sale?.SaleDetail?.reduce(
    (sum, detail) =>
      sum + detail.quantity * detail.price * (1 - detail.discount / 100),
    0
  );

  return (
    <PageComponent tittle="Detalle de venta">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="px-4">
          <h3 className="text-xl font-semibold my-2">
            {sale?.saleType === "CLIENT" ? "Cliente" : "Almacén"}
          </h3>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Nombre:</span>{" "}
            {sale?.saleType === "CLIENT"
              ? sale?.client.name
              : sale?.warehouse.name}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Teléfono:</span>{" "}
            {sale?.saleType === "CLIENT"
              ? sale?.client.phone
              : sale?.warehouse.phone}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Email:</span>{" "}
            {sale?.saleType === "CLIENT"
              ? sale?.client.email
              : sale?.warehouse.email}
          </p>
        </div>
        <div className="px-4 mt-2">
          <h3 className="text-lg font-semibold my-2">
            Información de la venta
          </h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 border">Producto</th>
                <th className="py-2 border">Cantidad</th>
                <th className="py-2 border">Precio Unitario</th>
                <th className="py-2 border">Descuento</th>
                <th className="py-2 border">Total</th>
                <th className="py-2 border">Total con Descuento</th>
              </tr>
            </thead>
            <tbody>
              {sale?.SaleDetail?.map((detail) => (
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
                  <td className="border px-4 py-2">{detail.discount}%</td>
                  <td className="border px-4 py-2">
                    ${(detail.quantity * detail.price).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    $
                    {(
                      detail.quantity *
                      detail.price *
                      (1 - detail.discount / 100)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <div>
              <span className="font-bold">Total de la venta: </span>
              <span>${totalAmount?.toFixed(2)}</span>
            </div>
            <div>
              <span className="font-bold">Total con descuento: </span>
              <span>${totalAmountWithDiscount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}

export default SaleDetail;
