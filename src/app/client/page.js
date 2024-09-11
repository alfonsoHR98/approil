"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useClient } from "@context/ClientContext";
import { toast } from "react-toastify";

function Client() {
  const {
    loadClients,
    clients,
    error: clientError,
    newClient,
    removeClient,
  } = useClient();
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
      rfc: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await newClient({
      name: data.name,
      address: data.address,
      rfc: data.rfc,
      email: data.email,
      phone: data.phone,
    });
    toast.success("Cliente registrado correctamente.");
    reset();
  });

  React.useEffect(() => {
    loadClients();
  }, []);

  return (
    <PageComponent tittle="Clientes">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Input
          label="Nombre"
          placeholder="John Doe"
          variant="bordered"
          size="sm"
          isRequired
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
          isRequired
          value={watch("address")}
          {...register("address", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors.address?.message}
          isInvalid={errors.address ? true : false}
        />
        <Input
          label="RFC"
          placeholder="XXXX000000X0X"
          variant="bordered"
          size="sm"
          isRequired
          value={watch("rfc")}
          {...register("rfc", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i,
              message: "RFC inválido",
            },
          })}
          errorMessage={errors.rfc?.message}
          isInvalid={errors.rfc ? true : false}
        />
        <Input
          label="Correo"
          placeholder="correo@correo.com"
          variant="bordered"
          size="sm"
          isRequired
          value={watch("email")}
          {...register("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
          isRequired
          value={watch("phone")}
          {...register("phone", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Número inválido",
            },
          })}
          errorMessage={errors.phone?.message}
          isInvalid={errors.phone ? true : false}
        />
        <Button color="primary" variant="shadow" size="md" onClick={onSubmit}>
          Guardar
        </Button>
      </div>
      {clientError ? (
        <div className="bg-red-500 text-white p-2 rounded mt-4">
          {clientError}
        </div>
      ) : (
        <TableComponent
          columns={[
            {
              key: "name",
              label: "Nombre",
            },
            { key: "address", label: "Dirección" },
            { key: "rfc", label: "RFC" },
            { key: "email", label: "Correo" },
            { key: "phone", label: "Teléfono" },
            { key: "actions", label: "Acciones" },
          ]}
          data={clients}
          removeItem={removeClient}
        />
      )}
    </PageComponent>
  );
}

export default Client;
