"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProductForm from "@/components/products/ProductForm"; // Import komponen form
import PieChart from "@/components/ui/PieChart";

const AdminDashboard = () => {
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: null,
    images: [""],
  });

  // Fungsi untuk menambah URL gambar
  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  // Fungsi untuk mengedit URL gambar tertentu
  const handleImageChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
  };

  // Fungsi untuk menghapus URL gambar tertentu
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
  };

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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          price: Number(formData.price),
          description: formData.description,
          categoryId: formData.categoryId,
          images: formData.images,
        }),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          title: "",
          price: 0,
          description: "",
          categoryId: null,
          images: [""],
        });
        setIsPopupVisible(false);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="mt-24 text-white rounded-3xl">
      <div className="container bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-3xl mx-auto py-12 px-6">
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
            <button
              onClick={() => setIsPopupVisible(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
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
        <PieChart />
      </div>

      {/* Popup Form */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ProductForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupVisible(false)}
            onAddImage={handleAddImage}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
