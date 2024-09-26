import { NextResponse } from "next/server";
import db from "@lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  const { name, email, password } = data;

  const foundUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (foundUser) {
    return NextResponse.json({
      message: "El usuario ya existe",
    }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "Usuario registrado" }, { status: 200 });
}
