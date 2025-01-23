"use client";

import { useCart } from "@/context/CartContext";
import Cookie from "js-cookie";

// context/UserContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Tipe data untuk user
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

// Tipe data untuk context
interface UserContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Membuat context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider untuk membungkus aplikasi dan menyediakan context
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { setCartItems, setOrderHistory } = useCart();

  const login = (user: User) => {
    setIsLoggedIn(true);
    setUser(user);
    Cookie.set("user", JSON.stringify(user), { expires: 1 });

    const userId = user.id;
    const storedCart = Cookie.get(`cart_${userId}`);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    const storedOrders = Cookie.get(`orderHistory_${userId}`);
    if (storedOrders) {
      setOrderHistory(JSON.parse(storedOrders));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCartItems([]);
    Cookie.remove("user");
  };

  // Cek apakah ada data user di localStorage saat aplikasi dimuat
  useEffect(() => {
    const storedUser = Cookie.get("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setIsLoggedIn(true);
      const userId = user.id;
      const storedCart = Cookie.get(`cart_${userId}`);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedOrders = Cookie.get(`orderHistory_${userId}`);
      if (storedOrders) {
        setOrderHistory(JSON.parse(storedOrders));
      }
    }
  }, [setCartItems, setOrderHistory]);

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
