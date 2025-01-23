import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Ambil data user dari cookies
  const userCookies = req.cookies.get("user");

  // Jika user belum login, redirect ke halaman login
  if (!userCookies) {
    return NextResponse.redirect(new URL("/login", req.url)); // Arahkan ke halaman login
  }

  // Parse cookie untuk mendapatkan role
  const user = JSON.parse(userCookies.value || "{}");
  const role = user.role;
  // Tentukan akses berdasarkan role
  const pathname = req.nextUrl.pathname;

  // Jika role user adalah admin dan mencoba mengakses halaman admin, lanjutkan
  if (role === "admin" && pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Jika role user adalah user biasa dan mencoba mengakses halaman checkout, lanjutkan
  if (role === "customer" && pathname.startsWith("/checkout")) {
    return NextResponse.next();
  }

  // Jika user mencoba mengakses halaman yang tidak diizinkan
  return NextResponse.redirect(new URL("/", req.url)); // Redirect ke homepage atau halaman lain
}

// Tentukan path yang akan diterapkan middleware-nya
export const config = {
  matcher: ["/checkout", "/admin/:path*"], // Gunakan path checkout atau halaman lain yang ingin Anda lindungi
};
