"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/AuthContext";

interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  description: string;
  quantity: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const CheckoutPage = () => {
  const { cartItems, calculateTotal } = useCart();
  const [invoiceDetails, setInvoiceDetails] = useState<any | null>(null);
  const { isLoggedIn, user, logout } = useUser();

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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto mt-28">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <img className="h-8 w-8 mr-2" src="/MampirShop.webp" alt="Logo" />
          <div className="text-gray-700 font-bold text-2xl">MampirShop</div>
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-xl mb-2">INVOICE</div>
          <div className="text-sm">Date: {new Date().toLocaleDateString()}</div>
          <div className="text-sm">
            Invoice #: INV{Math.floor(Math.random() * 100000)}
          </div>
        </div>
      </div>
      <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">{user?.name}</div>
        <div className="text-gray-700 mb-2">
          Jl. Parangtritis KM 20, Bantul, Yogyakarta
        </div>
        <div className="text-gray-700 mb-2">{user?.email}</div>
      </div>
      <table className="w-full text-left mb-8">
        <thead>
          <tr>
            <th className="text-gray-700 font-bold uppercase py-2">
              Description
            </th>
            <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
            <th className="text-gray-700 font-bold uppercase py-2">Price</th>
            <th className="text-gray-700 font-bold uppercase py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceDetails.items.map((product: Product) => (
            <tr key={product.id}>
              <td className="py-4 text-gray-700">{product.title}</td>
              <td className="py-4 text-gray-700">{product.quantity}</td>
              <td className="py-4 text-gray-700">
                ${product.price.toFixed(2)}
              </td>
              <td className="py-4 text-gray-700">
                ${(product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Subtotal:</div>
        <div className="text-gray-700">
          ${invoiceDetails.totalAmount.toFixed(2)}
        </div>
      </div>
      <div className="text-right mb-8">
        <div className="text-gray-700 mr-2">Discount:</div>
        <div className="text-gray-700">
          -${(invoiceDetails.totalAmount * 0.1).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Total:</div>
        <div className="text-gray-700 font-bold text-xl">
          $
          {(
            invoiceDetails.totalAmount -
            invoiceDetails.totalAmount * 0.1
          ).toFixed(2)}
        </div>
      </div>
      <div className="border-t-2 border-gray-300 pt-8 mb-8">
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
        <div className="text-gray-700 mb-2">
          Payment is due within 30 days. Late payments are subject to fees.
        </div>
        <div className="text-gray-700 mb-2">
          Payment Method: {invoiceDetails.paymentMethod}
        </div>
        <div className="text-gray-700 mb-2">
          Please make checks payable to Mampir Shop and mail to:
        </div>
        <div className="text-blue-700 underline">
          syifamuhammad3139@gmail.com
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
