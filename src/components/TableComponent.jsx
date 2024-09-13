"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  Pagination,
} from "@nextui-org/react";
import React, { useState, useMemo } from "react";
import { TbEye, TbEdit, TbTrash, TbDownload, TbSearch } from "react-icons/tb";
import { toast } from "react-toastify";

const actions = (item, deleteFunction) => {
  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
      deleteFunction(item.id);
      toast.success("Elemento eliminado correctamente.");
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Detalles">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <TbEye />
        </span>
      </Tooltip>
      <Tooltip content="Editar">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <TbEdit />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Eliminar">
        <span
          className="text-lg text-danger cursor-pointer active:opacity-50"
          onClick={handleDelete}
        >
          <TbTrash />
        </span>
      </Tooltip>
    </div>
  );
};
const getNestedValue = (obj, key) => {
  return key.split(".").reduce((o, i) => (o ? o[i] : null), obj);
};

function TableComponent({
  columns,
  data,
  removeItem,
  rowNumber,
  calculateTotal,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = rowNumber || 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      (getNestedValue(item, column.key) ?? "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const pages = Math.ceil(filteredData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <Input
          className="w-1/4"
          startContent={<TbSearch size={24} />}
          variant="bordered"
          placeholder="Buscar..."
          color="default"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          color="success"
          variant="shadow"
          endContent={<TbDownload size={24} />}
        >
          Exportar
        </Button>
      </div>
      <Table
        aria-label="Table component general"
        className="mt-2 max-h-[500px] overflow-y-auto"
        isHeaderSticky
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={"No hay registros."}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {(() => {
                    switch (columnKey) {
                      case "actions":
                        return actions(item, removeItem);
                      case "total":
                        return (
                          calculateTotal ? calculateTotal(item) : ""
                        ).toString();
                      default:
                        return (
                          getNestedValue(item, columnKey) ?? ""
                        ).toString();
                    }
                  })()}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableComponent;
