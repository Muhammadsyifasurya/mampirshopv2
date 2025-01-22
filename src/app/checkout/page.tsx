"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/AuthContext";
import Image from "next/image";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface InvoiceDetails {
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: string;
}

const CheckoutPage = () => {
  const {
    cartItems,
    calculateTotal,
    discountCode,
    discountAmount,
    addOrder,
    setCartItems,
  } = useCart();
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetails | null>(
    null
  );
  const { user } = useUser();

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = calculateTotal();
      setInvoiceDetails({
        items: cartItems,
        totalAmount: total,
        shippingAddress: "Jl. Contoh Alamat, Yogyakarta",
        paymentMethod: "Credit Card",
      });
    }
  }, [cartItems, calculateTotal]);

  if (!invoiceDetails) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  const handlePayment = () => {
    const newOrder = {
      id: `INV${Date.now()}`, // unique ID
      items: cartItems,
      totalAmount: calculateTotal(),
      date: new Date().toISOString(),
      status: "Completed",
    };
    addOrder(newOrder);
    setCartItems([]);

    alert("Order berhasil disimpan!");
  };
  return (
    <div className="bg-white mt-28 dark:bg-gray-800 rounded-3xl shadow-lg px-8 py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Image
            className="h-12 w-12 mr-3"
            src="/MampirShop.webp"
            alt="Logo"
            width={48}
            height={48}
          />
          <div className="text-gray-700 dark:text-gray-200 font-bold text-3xl">
            MampirShop
          </div>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-right">
          <div className="font-semibold text-xl mb-2">INVOICE</div>
          <div className="text-sm">Date: {new Date().toLocaleDateString()}</div>
          <div className="text-sm">
            Invoice #: INV{Math.floor(Math.random() * 100000)}
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="border-b-2 border-gray-300 dark:border-gray-600 pb-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Bill To:
        </h2>
        <div className="text-gray-700 dark:text-gray-300 mb-2">
          {user?.name}
        </div>
        <div className="text-gray-700 dark:text-gray-300 mb-2">
          Jl. Parangtritis KM 20, Yogyakarta
        </div>
        <div className="text-gray-700 dark:text-gray-300 mb-2">
          {user?.email}
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-left mb-8">
        <thead>
          <tr>
            <th className="text-gray-700 dark:text-gray-300 font-semibold uppercase py-3">
              Description
            </th>
            <th className="text-gray-700 dark:text-gray-300 font-semibold uppercase py-3">
              Quantity
            </th>
            <th className="text-gray-700 dark:text-gray-300 font-semibold uppercase py-3">
              Price
            </th>
            <th className="text-gray-700 dark:text-gray-300 font-semibold uppercase py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.items.map((product: CartItem) => (
            <tr
              key={product.id}
              className="border-b border-gray-200 dark:border-gray-600"
            >
              <td className="py-4 text-gray-700 dark:text-gray-300">
                {product.title}
              </td>
              <td className="py-4 text-gray-700 dark:text-gray-300">
                {product.quantity}
              </td>
              <td className="py-4 text-gray-700 dark:text-gray-300">
                ${product.price.toFixed(2)}
              </td>
              <td className="py-4 text-gray-700 dark:text-gray-300">
                ${(product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Subtotal and Discount */}
      <div className="flex justify-between mb-8 text-gray-700 dark:text-gray-300">
        <span className="font-medium">Subtotal:</span>
        <span>${invoiceDetails.totalAmount.toFixed(2)}</span>
      </div>

      {/* Discount Section */}
      <div className="text-right mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
            <span className="font-medium">Use code:</span>
            <span className="text-blue-500 dark:text-blue-400 font-semibold">
              {discountCode}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
            <span className="font-medium">Discount:</span>
            <span className="text-green-500 dark:text-green-400 font-semibold">
              {(discountAmount * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
            <span className="font-medium">Total Discount:</span>
            <span className="text-red-500 dark:text-red-400 font-semibold">
              -${(invoiceDetails.totalAmount * discountAmount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Final Total */}
      <div className="flex justify-between mb-8 text-gray-700 dark:text-gray-200 font-bold text-xl">
        <span>Total:</span>
        <span>${calculateTotal()}</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between border-t-2 border-gray-300 dark:border-gray-600 pt-8">
        <div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            Thank you for your business!
          </div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            Payment is due within 30 days. Late payments are subject to fees.
          </div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            Payment Method: {invoiceDetails.paymentMethod}
          </div>
          <div className="text-blue-700 dark:text-blue-400 underline">
            syifamuhammad3139@gmail.com
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="w-32 mt-16 py-3 text-white bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 dark:bg-gray-900 dark:hover:bg-gray-800"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
