"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { Product } from "@/interfaces/Props";
import axios from "axios";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
  status: string; // Pending, Completed, etc.
}

interface Category {
  id: number;
  name: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  orderHistory: Order[];
  discountCode: string;
  handleImage: (img: string) => string;
  discountAmount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  calculateTotal: () => number;
  setOrderHistory: React.Dispatch<React.SetStateAction<Order[]>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // Menambahkan setCartItems
  applyDiscount: (code: string) => void;
  addOrder: (order: Order) => void;
  cartCount: number;
  productsFilter: Product[];
  fetchFilteredProducts: () => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  selectedCategoryFilter: number | null;
  setSelectedCategoryFilter: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  categories: Category[];
  fetchCategories: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setProductsFilter: React.Dispatch<React.SetStateAction<Product[]>>;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortedProducts: Product[];
  sortOrder: string;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000); // Default max price
  const [productsFilter, setProductsFilter] = useState<Product[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    number | null
  >(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("");

  const getUserId = (): string | null => {
    const storedUser = Cookies.get("user"); // Get user data from cookies
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);
    return parsedUser.id || null;
  };

  const sortedProducts = sortOrder
    ? productsFilter.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.price - b.price; // Urutan harga dari rendah ke tinggi
        } else {
          return b.price - a.price; // Urutan harga dari tinggi ke rendah
        }
      })
    : productsFilter;

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
        {
          params: {
            price_min: minPrice,
            price_max: maxPrice,
            categoryId: selectedCategoryFilter,
            title: searchQuery,
          },
        }
      );
      setProductsFilter(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [minPrice, maxPrice, selectedCategoryFilter]);

  // Simpan data keranjang ke localStorage saat ada perubahan
  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    Cookies.set(`cart_${userId}`, JSON.stringify(cartItems), { expires: 7 }); // Set cookie with 7 days expiry
    Cookies.set(`orderHistory_${userId}`, JSON.stringify(orderHistory), {
      expires: 7,
    });
  }, [cartItems, orderHistory]);

  const DISCOUNT_CODES: Record<string, number> = {
    DISCOUNT10: 0.1,
    DISCOUNT20: 0.2,
  };

  const applyDiscount = (code: string) => {
    const discount = DISCOUNT_CODES[code.toUpperCase()] || 0;
    setDiscountAmount(discount);
    setDiscountCode(discount ? code : "");

    if (!discount) console.warn("Invalid discound code");
  };

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

  const addOrder = (order: Order) => {
    setOrderHistory((prevOrders) => [...prevOrders, order]);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return subtotal - subtotal * discountAmount;
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleImage = (img: string) => {
    const input = img;
    const regex = /(https?:\/\/[^\s\[\]"]+)/;
    const result =
      input.match(regex)?.[1] ||
      "https://down-id.img.susercontent.com/file/4d172e17968ca4535120c09e1c0df06c";
    return result;
  };

  return (
    <CartContext.Provider
      value={{
        sortOrder,
        sortedProducts,
        setSortOrder,
        setProductsFilter,
        loading,
        searchQuery, // Tambahkan searchQuery
        setSearchQuery, // Tambahkan setSearchQuery
        fetchCategories,
        categories,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        minPrice,
        maxPrice,
        setMaxPrice,
        setMinPrice,
        productsFilter,
        fetchFilteredProducts,
        setOrderHistory,
        handleImage,
        cartItems,
        orderHistory,
        discountCode,
        discountAmount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        setCartItems, // Menambahkan setCartItems ke value
        applyDiscount,
        addOrder,
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
