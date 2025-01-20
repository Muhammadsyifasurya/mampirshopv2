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
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
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
    // Update URL query parameter berdasarkan kategori yang dipilih
    router.push(`/list?page=1&categoryId=${categoryId || ""}`);
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
    // Update URL query parameter saat minPrice dan maxPrice kehilangan fokus
    router.push(`/list?page=1&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={minPrice}
          onChange={handleMinPriceChange}
          onBlur={handleBlur}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          onBlur={handleBlur}
        />
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
