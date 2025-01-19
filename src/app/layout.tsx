import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mampir Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <UserProvider>
            {/* Wrapper untuk memastikan layout flex */}
            <div className="flex flex-col min-h-screen">
              {/* Navbar */}
              <Navbar />

              {/* Konten utama dengan flex-grow */}
              <main className="flex-grow">{children}</main>

              {/* Footer */}
              <Footer />
            </div>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
