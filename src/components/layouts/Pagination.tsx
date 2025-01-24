"use client";
import { useState } from "react";
import ProductList from "@/components/products/ProductList";
import ProductForm from "@/components/products/ProductForm";
import { useCart } from "@/context/CartContext";

import { deleteData, updateData } from "@/app/service/api";
import usePagination from "@/hooks/usePagination";
import { Product, ProductData } from "@/interfaces/Props";
import Popup from "../ui/Popup";

interface Props {
  products: Product[];
}

const Pagination = ({ products }: Props) => {
  const [productList, setProductList] = useState<Product[]>(products);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    price: 0,
    description: "",
    categoryId: null,
    images: [],
  });

  // Gunakan custom hook untuk pagination
  const {
    currentItems: currentProducts,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = usePagination(productList, 8);

  const { addToCart } = useCart();

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    handleShowPopup();
  };

  const handleDelete = async (id: number) => {
    try {
      setProductList((prevList) =>
        prevList.filter((product) => product.id !== id)
      );
      await deleteData(`/products/${id}`);
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditStart = (product: Product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId,
      images: product.images,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              title: formData.title,
              price: formData.price,
              description: formData.description,
              categoryId: formData.categoryId,
              images: formData.images,
            }
          : product
      )
    );

    const updatedProduct: ProductData = {
      title: formData.title,
      price: formData.price,
      description: formData.description,
      categoryId: formData.categoryId,
      images: formData.images,
    };

    try {
      await updateData(`/products/${editingProduct.id}`, updatedProduct);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div>
      <Popup
        message="Item Berhasil ditambahkan ke keranjang!"
        isVisible={showPopup}
        type="success"
        onClose={() => setShowPopup(false)}
      />
      <div className="flex flex-wrap justify-between gap-10 w-[100%]">
        {currentProducts.map((product) => (
          <ProductList
            key={product.id}
            id={product.id}
            title={product.title}
            images={product.images}
            price={product.price}
            description={product.description}
            onAddToCart={() => handleAddToCart(product)}
            onDelete={handleDelete}
            onEdit={() => handleEditStart(product)}
          />
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevPage}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage === 1 ? "disabled:bg-gray-300" : ""
          }`}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            currentPage === totalPages ? "disabled:bg-gray-300" : ""
          }`}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
            <button
              onClick={handleCancel}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <ProductForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
