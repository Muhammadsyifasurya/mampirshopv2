"use client";
import { useState, useCallback } from "react";
import ProductList from "@/components/ProductList";
import { useCart } from "@/context/CartContext";
import Popup from "./Popup";

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
}

interface Props {
  products: Product[];
}

const ProductsWithPagination = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { addToCart } = useCart();

  // Total pages calculation using Math.ceil for simplicity
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the current page's products
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle Next and Previous buttons
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

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
    <div>
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <div className="flex flex-wrap justify-between gap-10">
        {currentProducts.map((product) => (
          <ProductList
            key={product.id}
            id={product.id}
            title={product.title}
            images={product.images}
            price={product.price}
            description={product.description}
            onAddToCart={() => handleAddToCart(product)}
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
    </div>
  );
};

export default ProductsWithPagination;
