"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const Filter = () => {
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
    setSortOrder,
    sortOrder,
  } = useCart();

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryFilter(categoryId); // Update context with selected category filter
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    console.log(sortOrder);
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

  const [showPriceInputs, setShowPriceInputs] = useState(false);

  useEffect(() => {
    if (showPriceInputs) {
      const timer = setTimeout(() => {
        setShowPriceInputs(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showPriceInputs]);

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <div className="flex gap-2">
          {!showPriceInputs && (
            <motion.button
              key="button"
              onClick={() => setShowPriceInputs(true)}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 hover:bg-slate-500 transition-all ease-in-out duration-300 hover:text-white"
            >
              Set Price Range
            </motion.button>
          )}
          {showPriceInputs && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.7 }}
              className="flex gap-2"
            >
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
            </motion.div>
          )}
        </div>
        <div className="relative">
          <select
            title="categories"
            name="type"
            className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 appearance-none cursor-pointer"
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
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="relative">
        <select
          title="sort by"
          id="sorted"
          value={sortOrder}
          onChange={handleSortChange}
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400 appearance-none cursor-pointer"
        >
          <option value="">Sort By</option>
          <option value="asc">Price (low to hight)</option>
          <option value="dsc">Price (hight to low)</option>
        </select>
        <svg
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Filter;
