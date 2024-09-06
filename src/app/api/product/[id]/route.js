import { NextResponse } from "next/server";
import db from "@lib/db";

export async function DELETE(req, { params }) {
  const id = params.id;
  const res = await db.product.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(res, { status: 200 });
}