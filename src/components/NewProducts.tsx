"use client";
import ProductList from "@/components/ProductList";
import { useCart } from "@/context/CartContext";
import Popup from "./Popup";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
}

const NewProducts = ({ products }: { products: Product[] }) => {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState<boolean>(false);

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

  return (
    <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <h1 className="text-2xl">New Products</h1>
      <div className="flex flex-wrap gap-10 mt-12 justify-between">
        {products.map((product) => (
          <ProductList
            id={product.id}
            key={product.id}
            title={product.title}
            images={product.images}
            price={product.price}
            description={product.description}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
