"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import axios from "@lib/axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

function HomePage() {
  const [top10Products, setTop10Products] = React.useState(null);

  async function getStats() {
    try {
      const response = await axios.get("/stats/top-selling-products");
      setTop10Products(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getStats();
  }, []);
  return (
    <PageComponent tittle="Home Page">
      <div className="gap-2 grid grid-cols-12 grid-rows-2">
        <Card className="col-span-12 sm:col-span-3 h-[300px]">
          <CardHeader className="">
            <h1 className="text-lg font-bold">Top 10 Selling Products</h1>
          </CardHeader>
          <CardBody className="">
            <ul>
              {top10Products &&
                top10Products.map((product) => (
                  <li key={product.product.id}>
                    {product.product.name} - {product.quantity}
                  </li>
                ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </PageComponent>
  );
}

export default HomePage;
