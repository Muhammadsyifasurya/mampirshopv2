"use client";

import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import Popup from "@/components/Popup";
import ProductImages from "@/components/ProductImages";
import { useCart } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import { getDataResponse } from "../service/api";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const SinglePage: React.FC = () => {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleAddToCart = (quantity: number) => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        image: product.images[0],
      });
      handleShowPopup();
    }
  };

  // Menggunakan getDataResponse untuk mengambil data produk
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getDataResponse(`/products/${slug}`);
        setProduct(data);
      } catch (error) {
        setError("Error fetching product: " + error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce200"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce400"></div>
        </div>
        <p className="ml-4 text-lg font-semibold text-gray-600">
          Memuat konten...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 pt-36">
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        type="success"
        onClose={() => setShowPopup(false)}
      />
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={product?.images} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.title}</h1>
        <p className="text-gray-500">{product?.description}</p>
        <div className="h-[2px] bg-gray-100"></div>
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">
            $
            {product?.price
              ? (product.price * 1.1).toFixed(2)
              : "Price not available"}
          </h3>
          <h3 className="font-medium text-2xl">${product?.price}</h3>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts />
        <Add onAddToCart={handleAddToCart} />
        <div className="h-[2px] bg-gray-100" />
      </div>
    </div>
  );
};

export default SinglePage;
