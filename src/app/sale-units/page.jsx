"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import { Input, Button } from "@nextui-org/react";
import { useSaleUnit } from "@context/SaleUnitContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function SaleUnit() {
  const {
    loadSaleUnits,
    saleUnits,
    error: saleUnitError,
    newSaleUnit,
    removeSaleUnit,
  } = useSaleUnit();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      value: "",
      unit: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await newSaleUnit({
      name: data.name,
      value: parseFloat(data.value),
      unit: data.unit,
    });
    toast.success("Unidad de venta registrada correctamente.");
    reset();
  });

  React.useEffect(() => {
    loadSaleUnits();
  }, []);

  return (
    <PageComponent tittle="Unidades de venta">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {saleUnitError ? (
          <div className="bg-red-500 text-white p-2 rounded">
            {saleUnitError}
          </div>
        ) : null}
        <Input
          label="Nombre"
          placeholder="Bulto"
          variant="bordered"
          value={watch("name")}
          {...register("name", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors?.name?.message}
          isInvalid={errors?.name ? true : false}
        />
        <Input
          label="Valor"
          placeholder="25.5"
          variant="bordered"
          value={watch("value")}
          {...register("value", {
            required: "Este campo es requerido",
            pattern: {
              value: /^(?:\d+|\d*\.\d{1,2})$/,
              message:
                "Debe ser un número entero o un número con hasta dos decimales",
            },
          })}
          errorMessage={errors?.value?.message}
          isInvalid={errors?.value ? true : false}
        />
        <Input
          label="Unidad"
          placeholder="kg"
          variant="bordered"
          value={watch("unit")}
          {...register("unit", { required: "Este campo es requerido" })}
          errorMessage={errors?.unit?.message}
          isInvalid={errors?.unit ? true : false}
        />
        <Button color="primary" variant="shadow" onClick={onSubmit}>
          Registrar
        </Button>
      </div>
      {saleUnitError ? (
        <div className="bg-red-500 text-white p-2 rounded mt-4">
          {saleUnitError}
        </div>
      ) : (
        <TableComponent
          columns={[
            {
              key: "name",
              label: "Nombre",
            },
            {
              key: "value",
              label: "Valor",
            },
            {
              key: "unit",
              label: "Unidad",
            },
            {
              key: "actions",
              label: "Acciones",
            },
          ]}
          data={saleUnits}
          removeItem={removeSaleUnit}
        />
      )}
    </PageComponent>
  );
}

export default SaleUnit;
