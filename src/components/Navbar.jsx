"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Link,
} from "@nextui-org/react";
import { VscSignOut } from "react-icons/vsc";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  TbBowlSpoon,
  TbUserPlus,
  TbBuildingWarehouse,
  TbUserDollar,
  TbLayoutDashboard,
  TbTableColumn,
  TbDatabase,
  TbTrash,
} from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const pages = [
  {
    name: "Inicio",
    href: "/",
    icon: <TbLayoutDashboard />,
  },
  {
    name: "Ventas",
    links: [
      {
        name: "Ventas realizadas",
        href: "/sale",
        icon: <TbTableColumn />,
      },
      {
        name: "Nueva venta",
        href: "/sale/new-sale",
        icon: <GiReceiveMoney />,
      },
    ],
  },
  {
    name: "Compras",
    links: [
      {
        name: "Compras realizadas",
        href: "/purchase",
        icon: <TbTableColumn />,
      },
      {
        name: "Nueva compra",
        href: "/purchase/new-purchase",
        icon: <GiPayMoney />,
      },
    ],
  },
  {
    name: "Registros",
    links: [
      {
        name: "Unidades de venta",
        href: "/sale-units",
        icon: <TbBowlSpoon />,
      },
      {
        name: "Productos",
        href: "/product",
        icon: <AiOutlineProduct />,
      },
      {
        name: "Clientes",
        href: "/client",
        icon: <TbUserPlus />,
      },
      {
        name: "Almacén",
        href: "/warehouse",
        icon: <TbBuildingWarehouse />,
      },
      {
        name: "Proveedores",
        href: "/supplier",
        icon: <TbUserDollar />,
      },
    ],
  },
  {
    name: "Inventario",
    href: "/inventory",
    icon: <TbDatabase />,
  },
  {
    name: "Desperdicios",
    href: "/waste",
    icon: <TbTrash />,
  },
];

function NavBar() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <Navbar maxWidth="2xl">
      <NavbarContent justify="start">
        <NavbarBrand>
          <h1 className="text-red-700 font-extrabold text-lg">APROIL</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex sm:justify-stretch"
        justify="center"
      >
        {pages.map((page) =>
          page.links ? (
            <Dropdown
              key={page.name}
              isOpen={openDropdown === page.name}
              onOpenChange={() => handleDropdownToggle(page.name)}
            >
              <DropdownTrigger>
                <Button
                  endContent={
                    openDropdown === page.name ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )
                  }
                  variant="light"
                  color="foreground"
                  size="lg"
                >
                  {page.icon}
                  {page.name}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {page.links.map((link) => (
                  <DropdownItem key={link.name} textValue={link.name}>
                    <Link
                      href={link.href}
                      color="foreground"
                      className="flex gap-2"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={page.name}>
              <Link href={page.href} color="foreground" className="flex gap-2">
                {page.icon}
                {page.name}
              </Link>
            </NavbarItem>
          )
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            variant="light"
            size="md"
            color="danger"
            isIconOnly
            onClick={() => {
              signOut();
              router.push("/auth/login");
            }}
          >
            <VscSignOut size={24} />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
