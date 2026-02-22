import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Protect admin routes (except login)
  if (nextUrl.pathname.startsWith("/admin") && !nextUrl.pathname.startsWith("/admin/login")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }
  }

  // Redirect logged-in users away from login page
  if (nextUrl.pathname === "/admin/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};