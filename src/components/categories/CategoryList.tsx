import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  images: string;
}

const CategoryList: React.FC<Props> = ({ images, name }) => {
  return (
    <Link
      href="/list?cat=test"
      className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
    >
      <div className="relative bg-slate-100 w-full h-96">
        <Image
          src={images}
          alt={name}
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
