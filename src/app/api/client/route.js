import { NextResponse } from "next/server";
import db from "@lib/db";

export async function GET(req) {
  const clients = await db.client.findMany();
  return NextResponse.json(clients, { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const { name, address, rfc, email, phone } = data;

  const clientFound = await db.client.findFirst({
    where: {
      rfc,
    },
  });

  if (clientFound) {
    return NextResponse.json(
      { message: "Client with this rfc already exists" },
      { status: 400 }
    );
  }

  const res = await db.client.create({
    data: {
      name,
      address,
      rfc,
      email,
      phone,
    },
  });
  return NextResponse.json(res, { status: 200 });
}