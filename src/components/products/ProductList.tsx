"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/AuthContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  onAddToCart: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<Product> = ({
  id,
  title,
  images,
  price,
  description,
  onAddToCart,
  onEdit,
  onDelete,
}) => {
  const { handleImage } = useCart();
  const [imgSrc, setImgSrc] = useState(handleImage(images[0]));
  const { user, isLoggedIn } = useUser();

  return (
    <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%] border rounded-2xl overflow-hidden">
      <Link
        href={`/${id}`}
        className="relative h-80 overflow-hidden min-w-[340px]"
      >
        <div className="size-full z-[9] animate-pulse bg-gray-500"></div>
        <Image
          src={imgSrc}
          onError={() =>
            setImgSrc(
              handleImage(
                "https://down-id.img.susercontent.com/file/4d172e17968ca4535120c09e1c0df06c"
              )
            )
          }
          alt={title || "Product Image"}
          fill
          className="absolute object-cover z-10 hover:scale-110 transition-all duration-300 ease-in-out transform w-full h-full"
        />
      </Link>
      <div className="flex justify-between px-4">
        <span className="font-medium">
          {title.length > 22 ? `${title.slice(0, 22)}...` : title}
        </span>
        <span className="font-semibold">${price.toLocaleString()}</span>
      </div>
      <div className="text-sm text-gray-500 px-4">
        {description.length > 100
          ? `${description.slice(0, 100)}...`
          : description}
      </div>
      <div className="flex justify-between items-center px-4 mb-4">
        <button
          className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 text-xs hover:bg-[#F35C7A] hover:text-white"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
        <div className="flex gap-2">
          {isLoggedIn && user?.role === "admin" && (
            <button
              className="rounded-2xl ring-1 ring-blue-500 text-blue-500 py-2 px-4 text-xs hover:bg-blue-500 hover:text-white"
              onClick={() => onEdit(id)}
            >
              Edit
            </button>
          )}
          {isLoggedIn && user?.role === "admin" && (
            <button
              className="rounded-2xl ring-1 ring-red-500 text-red-500 py-2 px-4 text-xs hover:bg-red-500 hover:text-white"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
