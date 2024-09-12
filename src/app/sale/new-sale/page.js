"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Divider,
} from "@nextui-org/react";
import { useClient } from "@context/ClientContext";
import { useProduct } from "@context/ProductContext";
import { useWarehouse } from "@context/WarehouseContext";
import { useForm, Controller, useFieldArray } from "react-hook-form";

function NewSale() {
  const [saleResult, setSaleResult] = React.useState(null);
  const { clients, loadClients } = useClient();
  const { products, loadProducts } = useProduct();
  const { warehouses, loadWarehouses } = useWarehouse();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      client_id: "",
      bill: "",
      account: "",
      products: [
        {
          product_id: "",
          warehouse_id: "",
          quantity: "",
          unitPrice: "",
          discount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setSaleResult(data);
  });

  React.useEffect(() => {
    loadClients();
    loadProducts();
    loadWarehouses();
  }, []);

  return (
    <PageComponent tittle="Nueva venta">
      <form onSubmit={onSubmit}>
        <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Controller
            name="client_id"
            control={control}
            rules={{ required: "El cliente es requerido" }}
            render={({ field, fieldState }) => (
              <Autocomplete
                label="Cliente"
                placeholder="Selecciona un cliente"
                variant="bordered"
                isRequired
                size="sm"
                defaultItems={clients}
                selectedKey={field.value}
                onSelectionChange={(key) => field.onChange(key)}
                errorMessage={errors.client_id?.message}
                isInvalid={errors.client_id ? true : false}
              >
                {(item) => (
                  <AutocompleteItem key={item.id} textValue={item.name}>
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Input
            label="Cuenta contable"
            placeholder=""
            variant="bordered"
            size="sm"
            isRequired
            value={watch("account")}
            {...register("account", {
              required: "Este campo es requerido",
            })}
            errorMessage={errors.account?.message}
            isInvalid={errors.account ? true : false}
          />
          <Input
            label="Factura"
            placeholder=""
            variant="bordered"
            size="sm"
            isRequired
            value={watch("bill")}
            {...register("bill", {
              required: "Este campo es requerido",
            })}
            errorMessage={errors.bill?.message}
            isInvalid={errors.bill ? true : false}
          />
        </div>
        <Divider className="my-4" />
        {/* Lista de productos */}
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 border p-2 rounded-md border-gray-300"
          >
            <Controller
              name={`products.${index}.product_id`}
              control={control}
              rules={{ required: "El producto es requerido" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  label="Producto"
                  placeholder="Selecciona un producto"
                  variant="bordered"
                  isRequired
                  size="sm"
                  defaultItems={products}
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                  errorMessage={errors.products?.[index]?.product_id?.message}
                  isInvalid={
                    errors.products?.[index]?.product_id ? true : false
                  }
                >
                  {(item) => (
                    <AutocompleteItem key={item.id} textValue={item.name}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name={`products.${index}.warehouse_id`}
              control={control}
              rules={{ required: "El almacén es requerido" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  label="Almacén"
                  placeholder="Selecciona un almacén"
                  variant="bordered"
                  isRequired
                  size="sm"
                  defaultItems={warehouses}
                  selectedKey={field.value}
                  onSelectionChange={(key) => field.onChange(key)}
                  errorMessage={errors.products?.[index]?.warehouse_id?.message}
                  isInvalid={
                    errors.products?.[index]?.warehouse_id ? true : false
                  }
                >
                  {(item) => (
                    <AutocompleteItem key={item.id} textValue={item.name}>
                      {item.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Input
              label="Cantidad"
              placeholder="12.5"
              variant="bordered"
              size="sm"
              isRequired
              {...register(`products.${index}.quantity`, {
                required: "Este campo es requerido",
              })}
              errorMessage={errors.products?.[index]?.quantity?.message}
              isInvalid={errors.products?.[index]?.quantity ? true : false}
            />
            <Input
              label="Precio unitario"
              placeholder="198.99"
              variant="bordered"
              size="sm"
              isRequired
              {...register(`products.${index}.unitPrice`, {
                required: "Este campo es requerido",
              })}
              errorMessage={errors.products?.[index]?.unitPrice?.message}
              isInvalid={errors.products?.[index]?.unitPrice ? true : false}
            />
            <Input
              label="Descuento (%)"
              placeholder="10"
              variant="bordered"
              size="sm"
              isRequired
              {...register(`products.${index}.discount`, {
                required: "Este campo es requerido",
              })}
              errorMessage={errors.products?.[index]?.discount?.message}
              isInvalid={errors.products?.[index]?.discount ? true : false}
            />
            <Button
              color="danger"
              variant="shadow"
              onClick={() => remove(index)}
            >
              Eliminar producto
            </Button>
          </div>
        ))}
        <div className="flex justify-end gap-4 w-full mt-4">
          <Button
            color="primary"
            variant="shadow"
            onClick={() =>
              append({
                product_id: "",
                warehouse_id: "",
                quantity: "",
                unitPrice: "",
                discount: "",
              })
            }
          >
            Agregar producto
          </Button>
        </div>
        <div className="flex justify-end gap-4 w-full mt-4">
          <Button color="danger" variant="shadow" onClick={() => reset()}>
            Cancelar venta
          </Button>
          <Button color="success" variant="shadow" type="submit">
            Registrar venta
          </Button>
        </div>
      </form>
    </PageComponent>
  );
}

export default NewSale;
