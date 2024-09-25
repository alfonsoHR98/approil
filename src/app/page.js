"use client";
import React from "react";
import PageComponent from "@components/PageComponent";
import axios from "@lib/axios";
import {
  Card,
  CardHeader,
  CardBody
} from "@nextui-org/react";
import { months } from "@utils/types";
import Chart from "chart.js/auto";

function HomePage() {
  const [top10Products, setTop10Products] = React.useState(null);
  const [salesByMonth, setSalesByMonth] = React.useState(null);
  const [wasteProducts, setWasteProducts] = React.useState(null);
  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  async function getStats() {
    try {
      const response = await axios.get("/stats/top-selling-products");
      const response2 = await axios.get("/stats/salesByMonth");
      const response3 = await axios.get("/stats/wastePerProduct");
      setTop10Products(response.data);
      setSalesByMonth(response2.data);
      setWasteProducts(response3.data);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getStats();
  }, []);

  React.useEffect(() => {
    if (salesByMonth && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: salesByMonth.map(
            (sale) => months[sale.month - 1].abbreviation
          ),
          datasets: [
            {
              label: "Sales",
              data: salesByMonth.map((sale) => sale.salesCount),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
              hoverBorderColor: "rgba(75, 192, 192, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              titleFont: {
                size: 16,
              },
              bodyFont: {
                size: 14,
              },
              footerFont: {
                size: 12,
              },
              callbacks: {
                label: function (context) {
                  return `Sales: ${context.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(200, 200, 200, 0.2)",
              },
              ticks: {
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
          },
        },
      });
    }
  }, [salesByMonth]);

  return (
    <PageComponent tittle="">
      <div className="gap-2 grid grid-cols-12 h-[80vh]">
        <div className="col-span-12 sm:col-span-3 flex flex-col gap-2">
          <Card className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-blue-500 text-white p-4">
              <h1 className="text-lg font-bold">Top 10 Selling Products</h1>
            </CardHeader>
            <CardBody className="p-4">
              <ul className="space-y-2">
                {top10Products &&
                  top10Products.map((product, i) => (
                    <li
                      key={product.product.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">
                        {i + 1}.- {product.product.name}
                        <pre className="text-xs">
                          {product.product.code} - {product.product.unit.name}
                        </pre>
                      </span>
                      <span className="text-gray-500">{product.quantity}</span>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
          <Card className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-blue-500 text-white p-4">
              <h1 className="text-lg font-bold">Top 10 Waste Products </h1>
            </CardHeader>
            <CardBody className="p-4">
              <ul className="space-y-2">
                {wasteProducts &&
                  wasteProducts.map((product, i) => (
                    <li
                      key={product.product.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">
                        {i + 1}.- {product.product.name}
                        <pre className="text-xs">
                          {product.product.code} - {product.product.unit.name}
                        </pre>
                      </span>
                      <span className="text-gray-500">{product.totalWaste}</span>
                    </li>
                  ))}
              </ul>
            </CardBody>
          </Card>
        </div>
        <Card className="col-span-12 sm:col-span-9 h-full bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-blue-500 text-white p-4">
            <h1 className="text-lg font-bold">Sales by Month</h1>
          </CardHeader>
          <CardBody className="p-4">
            <canvas ref={chartRef} id="salesByMonth"></canvas>
          </CardBody>
        </Card>
      </div>
    </PageComponent>
  );
}

export default HomePage;
