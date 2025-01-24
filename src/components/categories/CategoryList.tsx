"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  name: string;
  images: string;
}

const CategoryList: React.FC<Props> = ({ images, name }) => {
  const { handleImage } = useCart();
  const [imgSrc, setImgSrc] = useState(handleImage(images));
  return (
    <Link
      href="/list?cat=test"
      className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
    >
      <div className="relative bg-slate-100 w-full h-96">
        <Image
          src={imgSrc}
          alt={name}
          onError={() =>
            setImgSrc(
              handleImage(
                "https://down-id.img.susercontent.com/file/4d172e17968ca4535120c09e1c0df06c"
              )
            )
          }
          fill
          sizes="20vw"
          className="object-cover"
        />
      </div>
      <h1 className="mt-8 font-light text-cl tracking-wide">{name}</h1>
    </Link>
  );
};

export default CategoryList;
