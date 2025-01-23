"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link dari react-router-dom
import Menu from "./Menu";
import Image from "next/image";
import Searchbar from "./Searchbar";
import NavIcons from "./NavIcons";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = Cookies.get("user");
    console.log(user);
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsAdmin(parsedUser.role === "admin");
    }
  }, []);
  return (
    <>
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-[#1E293B] fixed z-20 w-full">
        {/* Mobile */}
        <div className="h-full flex justify-between items-center md:hidden">
          <Link href="/">
            <div className="text-2xl tracking-wide">MampirShop</div>
          </Link>
          <Menu />
        </div>
        {/* Big Screen */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
          {/* LEFT */}
          <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/MampirShop.webp"
                alt="oke"
                width={60}
                height={60}
              ></Image>
              <div className="text-2xl text-white font-bold tracking-wide">
                MampirShop
              </div>
            </Link>
            <div className="hidden xl:flex gap-4 text-[#64FFDA] text-[17px] font-semibold pt-1">
              <Link
                href="/"
                className="relative after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#A0AEC0] after:transition-all after:duration-300 hover:after:w-full"
              >
                Homepage
              </Link>
              <Link
                href="/list"
                className="relative after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#A0AEC0] after:transition-all after:duration-300 hover:after:w-full"
              >
                Category
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="relative after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#A0AEC0] after:transition-all after:duration-300 hover:after:w-full"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
            <Searchbar />
            <NavIcons />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
