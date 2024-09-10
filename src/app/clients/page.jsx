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
  return (
    <PageComponent tittle="Clientes">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Input
          label="Nombre"
          placeholder="John Doe"
          variant="bordered"
          value={""}
        />
        <Input
          label="Dirección"
          placeholder="Calle 1 fraccionamiento 2"
          variant="bordered"
          value={""}
        />
        <Input
          label="RFC"
          placeholder="XXXX000000X0X"
          variant="bordered"
          value={""}
        />
        <Input
          label="Correo"
          placeholder="correo@correo.com"
          variant="bordered"
          value={""}
        />
        <Input
          label="Teléfono"
          placeholder="1234567890"
          variant="bordered"
          value={""}
        />
        <Button color="primary" variant="shadow" size="lg">
          Guardar
        </Button>
      </div>
      
    </PageComponent>
  );
}

export default Client;
