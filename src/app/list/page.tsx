"use client";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDataResponse } from "../service/api";
import { useCart } from "@/context/CartContext";
import Popup from "@/components/Popup";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const ListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const nameQuery = searchParams.get("name") || "";
  const categoryId = searchParams.get("categoryId");
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000;
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const endpoint = `/products/?title=${nameQuery}${
          categoryId ? `&categoryId=${categoryId}` : ""
        }&price_min=${minPrice}&price_max=${maxPrice}`;
        const data = await getDataResponse(endpoint);
        setProducts(data);
      } catch (error) {
        setError(
          "Error fetching products: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [nameQuery, categoryId, minPrice, maxPrice]);

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    handleShowPopup();
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative pt-20">
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <div className="hidden bg-[#C0C1C3] px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br />
            Selected Products
          </h1>
          <button className="rounded-3xl bg-[#F35C7A] text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image
            src={"https://i.imgur.com/R3iobJA.jpeg"}
            alt="Discounted Products"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <Filter />
      {loading && (
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
      )}
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      <h1 className="mt-12 text-xl font-semibold">All For You!</h1>
      <div className="flex flex-wrap gap-10 mt-12 justify-center">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductList
              id={product.id}
              key={product.id}
              title={product.title}
              images={product.images}
              price={product.price}
              description={product.description}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ListPage;
