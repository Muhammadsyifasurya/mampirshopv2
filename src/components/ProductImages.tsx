"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ProductImagesProps {
  images?: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  // Jika images kosong, tampilkan pesan
  if (images.length === 0) {
    return (
      <div className="text-center">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Gambar utama */}
      <div className="h-[500px] relative">
        <Image
          src={images[index]}
          alt="Product image"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
          loading="lazy" // Lazy load untuk optimasi performa
        />
      </div>

      {/* Thumbnail images */}
      <div className="flex justify-start gap-4 mt-8">
        {images.map((img, i) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={i} // Menggunakan index untuk key, pastikan img unik atau gunakan id
            onClick={() => setIndex(i)}
          >
            <Image
              src={img}
              alt={`Thumbnail image ${i + 1}`}
              fill
              sizes="30vw"
              className="object-cover rounded-md"
              loading="lazy" // Lazy load
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
