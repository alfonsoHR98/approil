import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const sales = await db.sale.findMany({
    select: {
      createdAt: true,
    },
  });

  const salesByMonth = sales.reduce((acc, sale) => {
    const month = sale.createdAt.getMonth() + 1;
    const year = sale.createdAt.getFullYear();
    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = { month, year, salesCount: 0 };
    }

    acc[key].salesCount += 1;
    return acc;
  }, {});

  const result = Object.values(salesByMonth).sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month;
    }
    return a.year - b.year;
  });

  return NextResponse.json(result);
}
