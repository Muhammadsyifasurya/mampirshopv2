"use client";

import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDataResponse } from "../service/api";
import { useCart } from "@/context/CartContext";
import Popup from "@/components/Popup";
import ProductForm from "@/components/ProductForm";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: string;
}

const ListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { addToCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // Hindari penggunaan di SSR
    const nameQuery = searchParams.get("name") || "";
    const categoryId = searchParams.get("categoryId");
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 10000;

    const fetchProducts = async () => {
      try {
        setProducts([]); // Clear konten saat loading dimulai
        setLoading(true);
        setError(null);
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
  }, [searchParams]);

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

  const handleDelete = (id: number) => {
    setProducts((prevList) => prevList.filter((product) => product.id !== id));
  };

  const handleEditStart = (product: Product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      categoryId: product.categoryId,
      images: product.images[0],
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts((prevList) =>
      prevList.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              title: formData.title,
              price: parseFloat(formData.price),
              description: formData.description,
              categoryId: formData.categoryId,
              images: [formData.images],
            }
          : product
      )
    );

    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative pt-20">
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
            <button
              onClick={handleCancel}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <ProductForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        type="success"
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
      <h1 className="mt-12 text-xl font-semibold">All For You!</h1>

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
      {error && (
        <>
          <Popup
            message="Gagal memuat produk. Coba lagi nanti. !"
            type="error"
            isVisible={true}
            onClose={() => setShowPopup(false)}
          />
          <div className="mt-4 flex items-center gap-4 bg-gradient-to-r from-red-400 to-red-600 text-white p-4 rounded-lg shadow-lg">
            <div className="flex-shrink-0 bg-white text-red-500 rounded-full p-2 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold">Terjadi Kesalahan</p>
              <p className="text-sm">
                {error} <br />
                Silakan coba lagi atau hubungi tim dukungan.
              </p>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-x-[4%] gap-y-10 mt-12 justify-start">
        {products.length > 0
          ? products.map((product) => (
              <ProductList
                key={product.id}
                {...product}
                onAddToCart={() => handleAddToCart(product)}
                onDelete={() => handleDelete(product.id)}
                onEdit={() => handleEditStart(product)}
              />
            ))
          : !loading && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPage />
    </Suspense>
  );
}
