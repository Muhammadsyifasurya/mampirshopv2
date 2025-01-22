"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const ViewCartPage = () => {
  const {
    cartItems,
    discountCode,
    discountAmount,
    applyDiscount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
  } = useCart();

  const [inputDiscountCode, setInputDiscountCode] = useState("");

  const handleDiscountApply = () => {
    // Contoh kode diskon
    applyDiscount(inputDiscountCode);
  };

  return (
    <div className="mt-24 min-h-screen py-8">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {!cartItems || cartItems.length === 0 ? (
          <div className="text-center text-2xl font-semibold text-gray-700">
            Your cart is empty.
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Shopping Cart
            </h2>
            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={100}
                    className="object-cover rounded-md"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">
                        {item.title}
                      </h3>
                      <div className="text-xl text-gray-500">${item.price}</div>
                    </div>
                    <div className="text-sm text-gray-400">Available</div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition"
                        >
                          -
                        </button>
                        <span className="text-gray-600">
                          Qty. {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition"
                        >
                          +
                        </button>
                      </div>
                      <span
                        className="text-red-500 cursor-pointer hover:underline"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="mt-6 flex items-center gap-4">
              <input
                type="text"
                value={inputDiscountCode}
                onChange={(e) => setInputDiscountCode(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Enter Discount Code"
              />
              <button
                onClick={handleDiscountApply}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Apply
              </button>
            </div>
            {discountCode && (
              <div className="mt-2 text-green-500 font-semibold">
                Discount applied: {discountAmount * 100}% off!
              </div>
            )}

            {/* Bottom Section */}
            <div className="mt-6">
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-800">Subtotal</span>
                <span className="text-gray-800">${calculateTotal()}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2 mb-6">
                Shipping and taxes calculated at checkout.
              </p>

              {/* Actions */}
              <div className="flex justify-between">
                <Link href="/checkout">
                  <button className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900 transition">
                    Checkout
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCartPage;
