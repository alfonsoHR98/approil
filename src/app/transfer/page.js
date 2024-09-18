"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import { useInventory } from "@context/InventoryContext";
import { useWarehouse } from "@context/WarehouseContext";
import { useSale } from "@context/SaleContext";
import { useBatche } from "@context/BatcheContext";
import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  Divider,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";

function Transfer() {
  const { inventories, loadInventories, addInventory, subtractInventory } =
    useInventory();
  const { warehouses, loadWarehouses } = useWarehouse();
  const { newSale, newSaleDetail } = useSale();
  const { newBatche, newBatcheDetail } = useBatche();
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sup_warehouse: "",
      des_warehouse: "",
      product: "",
      quantity: "",
    },
  });

  React.useEffect(() => {
    loadInventories();
    loadWarehouses();
  }, []);

  const supWarehouse = watch("sup_warehouse");
  const selectedProduct = watch("product");

  React.useEffect(() => {
    if (supWarehouse) {
      const products = inventories
        .filter((item) => item.warehouse.id === supWarehouse)
        .map((item) => item.product);
      setFilteredProducts(products);
    } else {
      setFilteredProducts([]);
    }
  }, [supWarehouse, inventories]);

  const getAvailableQuantity = () => {
    const inventoryItem = inventories.find(
      (item) =>
        item.product.id === selectedProduct &&
        item.warehouse.id === supWarehouse
    );
    return inventoryItem ? inventoryItem.quantity : 0;
  };

  const onSubmit = handleSubmit(async (data) => {
    const inventoryItem = inventories.find(
      (item) =>
        item.product.id === data.product &&
        item.warehouse.id === data.sup_warehouse
    );

    if (inventoryItem) {
      const sale = await newSale({
        warehouse_id: data.des_warehouse,
        saleType: "WAREHOUSE",
        bill: "TRANSFERENCIA",
        account: "APROIL",
      });

      const saleDetail = await newSaleDetail({
        sale_id: sale.id,
        product_id: data.product,
        warehouse_id: data.sup_warehouse,
        quantity: parseFloat(data.quantity),
        price: parseFloat(inventoryItem?.price),
        discount: 0,
      });

      const batche = await newBatche({
        sup_warehouse_id: data.sup_warehouse,
        warehouse_id: data.des_warehouse,
        supplierType: "WAREHOUSE",
        bill: "TRANSFERENCIA",
      });

      const batcheDetail = await newBatcheDetail({
        batche_id: batche.id,
        product_id: data.product,
        quantity: parseFloat(data.quantity),
        price: parseFloat(inventoryItem?.price),
      });

      await subtractInventory({
        product_id: data.product,
        warehouse_id: data.sup_warehouse,
        quantity: parseFloat(data.quantity),
      });

      await addInventory({
        product_id: data.product,
        warehouse_id: data.des_warehouse,
        quantity: parseFloat(data.quantity),
      });
    }
  });

  return (
    <PageComponent tittle="Transferencias de mercancía">
      <form onSubmit={onSubmit} className="flex flex-col mt-6 gap-4">
        <div className="flex flex-row gap-4">
          <Controller
            name="sup_warehouse"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Autocomplete
                label="Almacén de origen"
                placeholder="Seleccione un almacén de origen"
                variant="bordered"
                isRequired
                defaultItems={warehouses}
                selectedKey={field.value}
                onSelectionChange={(key) => field.onChange(key)}
                errorMessage={errors.sup_warehouse?.message}
                isInvalid={errors.sup_warehouse ? true : false}
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
            name="product"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Autocomplete
                label="Producto"
                placeholder="Seleccione un producto"
                variant="bordered"
                isRequired
                isDisabled={!supWarehouse}
                defaultItems={filteredProducts}
                selectedKey={field.value}
                onSelectionChange={(key) => field.onChange(key)}
                errorMessage={errors.product?.message}
                isInvalid={errors.product ? true : false}
                disabled={!supWarehouse}
              >
                {(item) => (
                  <AutocompleteItem key={item.id} textValue={item.name}>
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <label className="text-xs text-neutral-600">
                        <span>{item.code}</span>
                        <span>{item?.unit?.name}</span>
                      </label>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Controller
            name="des_warehouse"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Autocomplete
                label="Almacén de destino"
                placeholder="Seleccione un almacén de destino"
                variant="bordered"
                isRequired
                defaultItems={warehouses}
                selectedKey={field.value}
                onSelectionChange={(key) => field.onChange(key)}
                errorMessage={errors.des_warehouse?.message}
                isInvalid={errors.des_warehouse ? true : false}
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
            placeholder="Ingrese la cantidad"
            variant="bordered"
            isRequired
            {...register("quantity", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,4})?$/,
                message: "Formato incorrecto",
              },
              validate: (value) =>
                parseFloat(value) <= getAvailableQuantity() ||
                "La cantidad no puede ser mayor a la disponible",
            })}
            errorMessage={errors.quantity?.message}
            isInvalid={errors.quantity ? true : false}
          />
        </div>
        <Divider />
        <div>
          <h2 className="text-lg font-semibold">Detalle de la transferencia</h2>
          <div className="flex flex-col gap-4">
            <p>
              Producto:{" "}
              {
                filteredProducts.find((item) => item.id === watch("product"))
                  ?.name
              }
            </p>

            <p>
              Almacén de origen:{" "}
              {
                warehouses.find((item) => item.id === watch("sup_warehouse"))
                  ?.name
              }
            </p>
            <p>
              Almacén de destino:{" "}
              {
                warehouses.find((item) => item.id === watch("des_warehouse"))
                  ?.name
              }
            </p>
            <p>
              Cantidad disponible:{" "}
              {
                inventories.find(
                  (item) =>
                    item.product.id === watch("product") &&
                    item.warehouse.id === watch("sup_warehouse")
                )?.quantity
              }
            </p>
            <p>
              Cantidad:{" "}
              <span className={errors.quantity ? "text-red-500" : ""}>
                {watch("quantity")}
              </span>
            </p>
          </div>
        </div>
        <Divider />
        <Button color="success" variant="shadow" type="submit">
          Transferir mercancía
        </Button>
      </form>
    </PageComponent>
  );
}

export default Transfer;
