"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Link from "next/link";

const CartModal = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
  } = useCart();

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20 max-h-[500px]">
      {!cartItems || cartItems.length === 0 ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* Top */}
          <div className="flex flex-col gap-8 overflow-y-auto flex-grow max-h-[300px] pr-4">
            {/* ITEM */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex items-center justify-between g-8">
                      <h3 className="font-semibold">
                        {item.title.slice(0, 15)}...
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm">
                        ${item.price}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">available</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-[7px] bg-gray-200 rounded-md hover:bg-gray-300 transition"
                      >
                        -
                      </button>
                      <span className="text-gray-500">
                        Qty. {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-[4px] bg-gray-200 rounded-md hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove{" "}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">SubTotal</span>
              <span className="">${calculateTotal()}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <Link href="/viewcart">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
              </Link>
              <Link href="/checkout">
                <button className="rounded-md py-3 px-4 bg-black text-white">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
