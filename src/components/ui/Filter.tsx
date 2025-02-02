"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk update URL query parameter
import { useCart } from "@/context/CartContext";

const Filter = () => {
  const router = useRouter(); // Inisialisasi router untuk mengubah URL
  const {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    fetchFilteredProducts,
    setSelectedCategoryFilter,
    selectedCategoryFilter,
    fetchCategories,
    categories,
    searchQuery,
  } = useCart();

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryFilter(categoryId); // Update context with selected category filter
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(Number(value));
    } else if (name === "maxPrice") {
      setMaxPrice(Number(value));
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [minPrice, maxPrice, selectedCategoryFilter, searchQuery]);

  useEffect(() => {
    fetchCategories(); // Fetch categories on initial load
  }, [fetchCategories]);

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            className="text-xs rounded-2xl text-center w-24 ring-1 ring-gray-400"
            value={minPrice}
            onChange={handleFilterChange}
          />
          <div className="flex items-center">
            <p className="border-b-2 w-3 border-[#848383]" />
          </div>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            className="text-xs rounded-2xl text-center w-24 ring-1 ring-gray-400"
            value={maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <select
          title="categories"
          name="type"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200"
          value={selectedCategoryFilter ?? ""}
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
