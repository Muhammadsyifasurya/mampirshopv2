"use client";
import React from "react";
import { useUser } from "@/context/AuthContext"; // Pastikan import dari UserContext
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const UserProfile: React.FC = () => {
  const { user, logout } = useUser();
  const { orderHistory } = useCart();

  return (
    <div className="profile-container py-12 px-8 max-w-5xl mx-auto mt-24 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl">
      {/* Header Profile */}
      <div className="flex items-center gap-6 mb-8">
        {/* Cek apakah ada avatar */}
        {user?.avatar ? (
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg ring-4 ring-indigo-600">
            <Image
              src={user.avatar}
              alt={`${user?.name}'s Profile`}
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
          </div>
        ) : (
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            {user?.name[0]} {/* Menampilkan inisial nama pengguna */}
          </div>
        )}
        <div>
          <h2 className="text-4xl font-semibold text-white">{user?.name}</h2>
          <p className="text-lg text-gray-300">Welcome back, {user?.name}!</p>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 mb-8 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Account Information
        </h3>
        <p className="text-gray-400 text-lg">Email: {user?.email}</p>
      </div>

      {/* Order History */}
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 mb-8 transform hover:scale-105 transition duration-300 ease-in-out">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Order History
        </h3>
        {orderHistory.length > 0 ? (
          <ul className="space-y-6">
            {orderHistory.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center border-b pb-4 border-gray-600"
              >
                <div>
                  <p className="font-semibold text-white text-lg">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-400">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div>Total: ${order.totalAmount.toFixed(2)}</div>
                <span
                  className={`px-4 py-2 text-xs font-semibold rounded-full ${
                    order.status === "Completed"
                      ? "bg-green-600 text-white"
                      : order.status === "Pending"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No orders found.</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-10 text-center">
        <button
          onClick={logout}
          className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 rounded-full font-semibold text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
