"use client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = await auth();

  const dateNow = new Date();
  const dateExpire = new Date(session?.expires);

  if (dateNow > dateExpire) {
    signOut();
  }

  if (session === null && req.url !== "/auth/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/client/:path*",
    "/product/:path*",
    "/inventory/:path*",
    "/purchase/:path*",
    "/sale/:path*",
    "/sale-units/:path*",
    "/supplier/:path*",
    "/transfer/:path*",
    "/warehouse/:path*",
  ],
};
