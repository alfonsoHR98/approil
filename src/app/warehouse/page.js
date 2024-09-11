"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import { Input, Button } from "@nextui-org/react";
import { useWarehouse } from "@context/WarehouseContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Warehouse() {
  const {
    loadWarehouses,
    warehouses,
    error: warehouseError,
    newWarehouse,
    removeWarehouse,
  } = useWarehouse();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await newWarehouse({
      name: data.name,
      address: data.address,
      email: data.email,
      phone: data.phone,
    });
    toast.success("Almacén registrado correctamente.");
    reset();
  });

  React.useEffect(() => {
    loadWarehouses();
  }, []);

  return (
    <PageComponent tittle="Almacén">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Input
          label="Nombre"
          placeholder="John Doe"
          variant="bordered"
          size="sm"
          value={watch("name")}
          {...register("name", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors.name?.message}
          isInvalid={errors.name ? true : false}
        />
        <Input
          label="Dirección"
          placeholder="Calle 1 fraccionamiento 2"
          variant="bordered"
          size="sm"
          value={watch("address")}
          {...register("address", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors.address?.message}
          isInvalid={errors.address ? true : false}
        />
        <Input
          label="Correo"
          placeholder="correo@correo.com"
          variant="bordered"
          size="sm"
          value={watch("email")}
          {...register("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Correo inválido",
            },
          })}
          errorMessage={errors.email?.message}
          isInvalid={errors.email ? true : false}
        />
        <Input
          label="Teléfono"
          placeholder="1234567890"
          variant="bordered"
          size="sm"
          value={watch("phone")}
          {...register("phone", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Teléfono inválido",
            },
          })}
          errorMessage={errors.phone?.message}
          isInvalid={errors.phone ? true : false}
        />
        <Button color="primary" variant="shadow" onClick={onSubmit}>
          Registrar
        </Button>
      </div>
      {warehouseError ? (
        <div className="bg-red-500 text-white p-2 rounded mt-4">
          {warehouseError}
        </div>
      ) : (
        <TableComponent
          columns={[
            {
              key: "name",
              label: "Nombre",
            },
            {
              key: "address",
              label: "Dirección",
            },
            {
              key: "email",
              label: "Correo",
            },
            {
              key: "phone",
              label: "Teléfono",
            },
            {
              key: "actions",
              label: "Acciones",
            },
          ]}
          data={warehouses}
          removeItem={removeWarehouse}
        />
      )}
    </PageComponent>
  );
}

export default Warehouse;
