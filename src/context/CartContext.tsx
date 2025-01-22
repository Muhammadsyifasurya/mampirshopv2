"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie"; // Import js-cookie

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  discountCode: string;
  discountAmount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  calculateTotal: () => number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Menambahkan setCartItems
  applyDiscount: (code: string) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const getUserId = (): string | null => {
    const user = Cookies.get("user"); // Get user data from cookies
    if (!user) return null;

    const parsedUser = JSON.parse(user);
    return parsedUser.id || null;
  };

  const applyDiscount = (code: string) => {
    if (code === "DISCOUNT10") {
      setDiscountAmount(0.1); // 10% discount
      setDiscountCode(code);
    } else if (code === "DISCOUNT20") {
      setDiscountAmount(0.2); // 20% discount
      setDiscountCode(code);
    } else {
      setDiscountAmount(0);
      setDiscountCode("");
      alert("Invalid discount code!");
    }
  };

  // Ambil data keranjang berdasarkan userId saat aplikasi dimuat
  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    const storedCart = Cookies.get(`cart_${userId}`);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Simpan data keranjang ke localStorage saat ada perubahan
  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    Cookies.set(`cart_${userId}`, JSON.stringify(cartItems), { expires: 7 }); // Set cookie with 7 days expiry
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        discountCode,
        discountAmount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        setCartItems, // Menambahkan setCartItems ke value
        applyDiscount,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
