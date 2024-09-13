"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import TableComponent from "@components/TableComponent";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useProduct } from "@context/ProductContext";
import { useSaleUnit } from "@context/SaleUnitContext";
import { toast } from "react-toastify";

function Product() {
  const {
    loadProducts,
    products,
    error: productError,
    newProduct,
    removeProduct,
  } = useProduct();
  const { saleUnits, loadSaleUnits } = useSaleUnit();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      descrip: "",
      brand: "",
      code: "",
      unit_id: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  React.useEffect(() => {
    loadProducts();
    loadSaleUnits();
  }, []);

  return (
    <PageComponent tittle="Productos">
      <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Input
          label="Nombre"
          placeholder="ACEITE 15W40"
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
          label="Descripción"
          placeholder="Esta es una descripción del producto..."
          variant="bordered"
          size="sm"
          isRequired
          value={watch("descrip")}
          {...register("descrip", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors.descrip?.message}
          isInvalid={errors.descrip ? true : false}
        />
        <Input
          label="Marca"
          placeholder="Aproil"
          variant="bordered"
          size="sm"
          isRequired
          value={watch("brand")}
          {...register("brand", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors.brand?.message}
          isInvalid={errors.brand ? true : false}
        />
        <Input
          label="Código"
          placeholder="ACO012AM0002"
          variant="bordered"
          size="sm"
          isRequired
          value={watch("code")}
          {...register("code", {
            required: "Este campo es requerido",
          })}
          errorMessage={errors.code?.message}
          isInvalid={errors.code ? true : false}
        />
        <Controller
          name="unit_id"
          control={control}
          rules={{ required: "Este campo es requerido" }}
          render={({ field, fieldState }) => (
            <Autocomplete
              label="Unidad"
              placeholder="Selecciona una unidad"
              variant="bordered"
              isRequired
              size="sm"
              defaultItems={saleUnits}
              selectedKey={field.value}
              onSelectionChange={(key) => field.onChange(key)}
              errorMessage={errors.unit_id?.message}
              isInvalid={errors.unit_id ? true : false}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />
        <Button color="primary" variant="shadow" onClick={onSubmit}>
          Registrar
        </Button>
      </div>
      {productError ? (
        <div className="bg-red-500 text-white p-2 rounded mt-4">
          {productError}
        </div>
      ) : (
        <TableComponent
          columns={[
            {
              key: "name",
              label: "Nombre",
            },
            {
              key: "descrip",
              label: "Descripción",
            },
            {
              key: "brand",
              label: "Marca",
            },
            {
              key: "code",
              label: "Código",
            },
            {
              key: "unit_id",
              label: "Unidad",
            },
            {
              key: "actions",
              label: "Acciones",
            },
          ]}
          data={products}
          removeItem={removeProduct}
        />
      )}
    </PageComponent>
  );
}

export default Product;
