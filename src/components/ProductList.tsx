"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  onAddToCart: () => void;
}

const ProductList: React.FC<Product> = ({
  id,
  title,
  images,
  price,
  description,
  onAddToCart,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] border rounded-2xl">
      <Link href={`/${id}`} className="relative w-full h-80 overflow-hidden">
        <Image
          src={images[0]}
          alt={title || "Product Image"}
          fill
          sizes="25vw"
          className="absolute object-cover rounded-md z-10 hover:scale-110 transition-all duration-300 ease-in-out transform"
        />
      </Link>
      <div className="flex justify-between px-4">
        <span className="font-medium">{title.slice(0, 25)}...</span>
        <span className="font-semibold">${price}</span>
      </div>
      <div className="text-sm text-gray-500 px-4">
        {description.slice(0, 100)}...
      </div>
      {/* Add to Cart button outside of the Link */}
      <button
        className="mx-4 mb-4 rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] w-max py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white"
        onClick={onAddToCart} // Call the add to cart handler on button click
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductList;
