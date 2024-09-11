"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
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
      <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <TbEye />
        </span>
      </Tooltip>
      <Tooltip content="Edit user">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <TbEdit />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete user">
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

function TableComponent({ columns, data, removeItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      (getKeyValue(item, column.key) ?? "")
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
                  {columnKey === "actions"
                    ? actions(item, removeItem)
                    : (getKeyValue(item, columnKey) ?? "").toString()}
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
