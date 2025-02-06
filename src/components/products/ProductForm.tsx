"use client";

import React from "react";

interface ProductFormProps {
  formData: {
    title: string;
    price: number;
    description: string;
    categoryId: number | null;
    images: string[];
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (index: number, value: string) => void;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  onInputChange,
  onImageChange,
  onAddImage,
  onRemoveImage,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
      <form role="form" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            placeholder="Enter title"
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            title="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={onInputChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={onInputChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="categoryId">
            Category ID
          </label>
          <input
            id="categoryId"
            type="number"
            placeholder="Enter category ID"
            name="categoryId"
            value={formData.categoryId ? formData.categoryId : ""}
            onChange={onInputChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        {/* Dynamic Image URL Inputs */}
        <div className="mb-4">
          <label className="block text-sm mb-2" htmlFor="image">
            Image URLs (Max : 3)
          </label>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={image}
                placeholder="Enter image URL"
                onChange={(e) => onImageChange(index, e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="ml-2 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddImage}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2"
            disabled={formData.images.length >= 3}
          >
            + Add Image
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
