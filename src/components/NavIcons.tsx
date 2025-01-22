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

      {isProfileOpen ? (
        <div className="absolute pt-6 pb-4 px-7 rounded-lg bg-white top-12 left-0 text-sm shadow-lg z-30 max-w-[300px]">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="absolute top-[1px] right-2 text-xl text-gray-600 hover:text-gray-800 transition duration-200"
          >
            ×
          </button>
          {isLoggedIn ? (
            <>
              <div className="font-semibold text-gray-800">
                Hai, {user?.name}!
              </div>{" "}
              {/* Nama pengguna */}
              <div
                className="mt-3 cursor-pointer text-gray-600 hover:text-gray-900 hover:underline transition duration-200"
                onClick={handleLogout}
              >
                Logout
              </div>
              {/* Link ke halaman profil */}
              <Link
                href="/profile"
                className="mt-3 block text-gray-600 hover:text-gray-900 hover:underline transition duration-200"
              >
                Go to Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="mt-2 block text-gray-600 hover:text-gray-900 hover:underline transition duration-200"
              >
                Register
              </Link>
            </>
          )}
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
        {cartCount > 0 && (
          <p className="absolute -top-4 -right-4 w-6 h-6 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center">
            {cartCount}
          </p>
        )}
      </div>

      {isCartOpen && <CartModal closeModal={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavIcons;
