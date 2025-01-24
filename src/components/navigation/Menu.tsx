"use client";
import React, { useState } from "react";
import Hamburger from "./Hamburger";
import Link from "next/link"; // Import Link dari react-router-dom

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Hamburger open={open} setOpen={setOpen} />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/">HomePage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">About</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart(1)</Link>
        </div>
      )}
    </>
  );
};

export default Menu;
