"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk update URL query parameter

interface Category {
  id: number;
  name: string;
}

const Filter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const router = useRouter(); // Inisialisasi router untuk mengubah URL

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories" + error);
      console.log(err);
    }
  };

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    // Jika kategori dipilih, update URL dengan kategori
    if (categoryId !== null) {
      router.push(`/list?page=1&categoryId=${categoryId}`);
    } else {
      // Jika tidak ada kategori, tetap update dengan minPrice dan maxPrice saja
      router.push(`/list?page=1&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    }
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMaxPrice(value);
    }
  };

  const handleBlur = () => {
    // Jika salah satu nilai undefined atau kosong, jangan update URL
    if (!minPrice || !maxPrice) {
      return; // Tidak melakukan apa-apa
    }

    // Ambil categoryId saat ini, jika tidak ada kategori, URL hanya mengandung minPrice dan maxPrice
    if (selectedCategory !== null) {
      router.push(
        `/list?page=1&categoryId=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
    } else {
      // Jika tidak ada kategori yang dipilih, update hanya dengan minPrice dan maxPrice
      router.push(`/list?page=1&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <div className="flex gap-2">
          <input
            type="text"
            name="min"
            placeholder="min price"
            className="text-xs rounded-2xl text-center w-24 ring-1 ring-gray-400"
            value={minPrice}
            onChange={handleMinPriceChange}
            onBlur={handleBlur}
          />
          <div className="flex items-center">
            <p className="border-b-2 w-3 border-[#848383]" />
          </div>
          <input
            type="text"
            name="max"
            placeholder="max price"
            className="text-xs rounded-2xl text-center w-24 ring-1 ring-gray-400"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            onBlur={handleBlur}
          />
        </div>
        <select
          title="oke"
          name="type"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200"
          value={selectedCategory ?? ""}
          onChange={(e) => handleCategoryChange(Number(e.target.value))}
        >
          <option value="">All Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <select
          title="oke"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
        >
          <option>Sort By</option>
          <option value="">Price (low to hight)</option>
          <option value="">Price (hight to low)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
