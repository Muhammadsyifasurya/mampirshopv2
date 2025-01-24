"use client";
import ProductList from "@/components/ProductList";
import { useCart } from "@/context/CartContext";
import Popup from "./Popup";
import { useState } from "react";
import ProductForm from "./ProductForm";

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  categoryId: string; // Keep consistent with the rest of your app
}

const NewProducts = ({ products }: { products: Product[] }) => {
  const { addToCart } = useCart();
  const [productList, setProductList] = useState<Product[]>(products); // Renamed state to productList
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "", // Keep as string for form handling
    images: "",
  });

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

  const handleDelete = (id: number) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.id !== id)
    ); // Updated to productList
  };

  const handleEditStart = (product: Product) => {
    setIsEditing(true);
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      categoryId: product.categoryId,
      images: product.images[0],
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              title: formData.title,
              price: parseFloat(formData.price),
              description: formData.description,
              categoryId: formData.categoryId,
              images: [formData.images],
            }
          : product
      )
    );

    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* Popup for Add to Cart */}
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />

      {/* Edit Product Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative max-w-2xl">
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

      <h1 className="text-2xl">New Products</h1>

      {/* Product List */}
      <div className="flex flex-wrap gap-10 mt-12 justify-between">
        {productList.map((product) => (
          <ProductList
            id={product.id}
            key={product.id}
            title={product.title}
            images={product.images}
            price={product.price}
            description={product.description}
            onAddToCart={() => handleAddToCart(product)}
            onDelete={() => handleDelete(product.id)}
            onEdit={() => handleEditStart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
