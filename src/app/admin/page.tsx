"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "admin") {
      router.push("/");
    }
  }, []);

  return (
    <div className="h-screen mt-24 text-white rounded-3xl">
      <div className="container  bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Welcome to the Admin Panel! Manage your content efficiently.
          </p>
        </header>

        {/* Content */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Add Product
            </button>
            <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Manage Categories
            </button>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-orange-500 hover:to-yellow-500 text-white py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
