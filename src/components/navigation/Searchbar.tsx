"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const { setSearchQuery } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    setSearchQuery(name);

    router.push(`/category?search=${encodeURIComponent(name)}`);
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-3xl px-5 flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button title="oke" className="cursor-pointer">
        <Image src="/search.svg" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default Searchbar;
