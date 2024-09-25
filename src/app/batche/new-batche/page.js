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
import { useRouter } from "next/navigation";
import { useWarehouse } from "@context/WarehouseContext";
import { useProduct } from "@context/ProductContext";
import { useSupplier } from "@context/SupplierContext";
import { useBatche } from "@context/BatcheContext";
import { useInventory } from "@context/InventoryContext";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

function NewBatche() {
  const { products, loadProducts } = useProduct();
  const { warehouses, loadWarehouses } = useWarehouse();
  const { suppliers, loadSuppliers } = useSupplier();
  const { newBatche, newBatcheDetail } = useBatche();
  const { addInventory } = useInventory();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier_id: "",
      warehouse_id: "",
      bill: "",
      products: [
        {
          product_id: "",
          quantity: "",
          price: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await newBatche({
      supplier_id: data.supplier_id,
      warehouse_id: data.warehouse_id,
      supplierType: "SUPPLIER",
      bill: data.bill,
    });
    const batche_id = res.id;

    data.products.forEach(async (product) => {
      await newBatcheDetail({
        batche_id,
        product_id: product.product_id,
        quantity: parseFloat(product.quantity),
        price: parseFloat(product.price),
      });
      await addInventory({
        product_id: product.product_id,
        warehouse_id: data.warehouse_id,
        quantity: parseFloat(product.quantity),
      });
    });

    toast.success("Compra registrada correctamente");
    router.push("/batche");
  });

  React.useEffect(() => {
    loadProducts();
    loadWarehouses();
    loadSuppliers();
  }, []);

  return (
    <PageComponent tittle="Nueva compra">
      <form onSubmit={onSubmit}>
        <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Controller
            name="supplier_id"
            control={control}
            rules={{ required: "El proveedor es requerido" }}
            render={({ field, fieldState }) => (
              <Autocomplete
                label="Proveedor"
                placeholder="Selecciona un proveedor"
                variant="bordered"
                isRequired
                size="sm"
                defaultItems={suppliers}
                selectedKey={field.value}
                onSelectionChange={(key) => field.onChange(key)}
                errorMessage={errors.supplier_id?.message}
                isInvalid={errors.supplier_id ? true : false}
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
            name="warehouse_id"
            control={control}
            rules={{ required: "La bodega es requerida" }}
            render={({ field, fieldState }) => (
              <Autocomplete
                label="Bodega"
                placeholder="Selecciona una bodega"
                variant="bordered"
                isRequired
                size="sm"
                defaultItems={warehouses}
                selectedKey={field.value}
                onSelectionChange={(key) => field.onChange(key)}
                errorMessage={errors.warehouse_id?.message}
                isInvalid={errors.warehouse_id ? true : false}
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
            label="Factura"
            placeholder="QWERTY1234"
            variant="bordered"
            size="sm"
            isRequired
            {...register("bill", {
              required: "Este campo es requerido",
            })}
            errorMessage={errors.bill?.message}
            isInvalid={errors.bill ? true : false}
          />
        </div>
        <Divider className="my-4" />

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 border p-2 rounded-md border-gray-300 shadow-md"
          >
            <Controller
              name={`products[${index}].product_id`}
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
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <span className="text-xs flex justify-between gap-2">
                          <p className=" text-gray-500">{item.code}</p>
                          {item.unit.name}
                        </span>
                      </div>
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Input
              label="Cantidad"
              placeholder="20"
              variant="bordered"
              size="sm"
              isRequired
              {...register(`products[${index}].quantity`, {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,4})?$/,
                  message: "Formato incorrecto",
                },
              })}
              errorMessage={errors.products?.[index]?.quantity?.message}
              isInvalid={errors.products?.[index]?.quantity ? true : false}
            />
            <Input
              label="Precio"
              placeholder="12.98"
              variant="bordered"
              size="sm"
              isRequired
              {...register(`products[${index}].price`, {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,4})?$/,
                  message: "Formato incorrecto",
                },
              })}
              errorMessage={errors.products?.[index]?.price?.message}
              isInvalid={errors.products?.[index]?.price ? true : false}
            />
            <Button
              color="danger"
              variant="shadow"
              onClick={() => remove(index)}
            >
              Eliminar
            </Button>
          </div>
        ))}
        <div className="flex justify-end gap-4 w-full mt-4">
          <Button
            color="danger"
            variant="shadow"
            onClick={() => router.push("/purchase")}
          >
            Cancelar compra
          </Button>
          <Button
            color="primary"
            variant="shadow"
            onClick={() =>
              append({
                product_id: "",
                quantity: "",
                price: "",
              })
            }
          >
            Agregar producto
          </Button>
          <Button color="success" variant="shadow" type="submit">
            Registrar compra
          </Button>
        </div>
      </form>
    </PageComponent>
  );
}

export default NewBatche;
