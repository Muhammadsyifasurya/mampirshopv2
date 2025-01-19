"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/AuthContext";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useUser();
  const router = useRouter();

  // Fungsi untuk membuka profile dropdown atau menuju ke login jika belum login
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login"); // Arahkan ke halaman login
    }
    setIsProfileOpen((prev) => !prev);
  };

  // Fungsi untuk logout (opsional)
  const handleLogout = () => {
    logout(); // Set status login menjadi false
    router.push("/login"); // Arahkan ke halaman login setelah logout
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {/* Profile Icon */}
      <button
        aria-label="Profile"
        onClick={handleProfile}
        className="cursor-pointer"
      >
        <Image
          src="/profile.svg"
          alt="Profile Icon"
          width={25}
          height={25}
          style={{
            filter:
              "invert(63%) sepia(7%) saturate(232%) hue-rotate(175deg) brightness(90%) contrast(89%)",
          }}
        />
      </button>

      {isProfileOpen && isLoggedIn ? (
        // Menampilkan dropdown jika sudah login
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-30">
          <div>Hai, {user?.name}!</div> {/* Nama pengguna */}
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        </div>
      ) : isProfileOpen && !isLoggedIn ? (
        // Jika belum login, arahkan ke login
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/login">Login</Link>
          <Link href="/register" className="mt-2 block">
            Register
          </Link>
        </div>
      ) : null}

      {/* Notification Icon */}
      <button aria-label="Notifications" className="cursor-pointer">
        <Image
          src="/notification.svg"
          alt="Notification Icon"
          width={35}
          height={35}
          style={{
            filter:
              "invert(63%) sepia(7%) saturate(232%) hue-rotate(175deg) brightness(90%) contrast(89%)",
          }}
        />
      </button>

      {/* Cart Icon with Item Count */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image
          src="/cart.svg"
          alt="Shopping Cart Icon"
          width={30}
          height={30}
          style={{
            filter:
              "invert(63%) sepia(7%) saturate(232%) hue-rotate(175deg) brightness(90%) contrast(89%)",
          }}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center">
          {cartCount}
        </div>
      </div>

      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
