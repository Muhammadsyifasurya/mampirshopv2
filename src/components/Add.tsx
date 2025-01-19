"use client";

import React, { useState } from "react";

interface AddProps {
  onAddToCart: (quantity: number) => void;
}

const Add: React.FC<AddProps> = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const updateQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < 5) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => updateQuantity("d")}
              aria-label="Decrease quantity"
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => updateQuantity("i")}
              aria-label="Increase quantity"
              disabled={quantity === 5}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 hover:bg-[#F35C7A] hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
          onClick={() => onAddToCart(quantity)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
