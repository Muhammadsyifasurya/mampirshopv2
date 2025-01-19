import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Ambil data user dari cookies
  const userCookies = req.cookies.get("user");

  // Jika user belum login, redirect ke halaman login
  if (!userCookies) {
    return NextResponse.redirect(new URL("/login", req.url)); // Arahkan ke halaman login
  }

  // Jika sudah login, lanjutkan request ke halaman checkout
  return NextResponse.next();
}

// Tentukan path yang akan diterapkan middleware-nya
export const config = {
  matcher: ["/checkout"], // Gunakan path checkout atau halaman lain yang ingin Anda lindungi
};
