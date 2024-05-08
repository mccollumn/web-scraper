import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const loginMap: any = {};

export function middleware(request: NextRequest) {
  const ip: any = request.headers.get("x-forwarded-for");

  if (!loginMap[ip]) {
    loginMap[ip] = true;
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/logout")) {
    loginMap[ip] = false;
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
