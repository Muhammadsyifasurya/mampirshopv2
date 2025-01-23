"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      router.push("/login"); // Redirect jika tidak login
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "admin") {
      router.push("/"); // Redirect jika bukan admin
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mt-28">Admin Dashboard</h1>
      <p>Welcome to the Admin Panel!</p>
    </div>
  );
};

export default AdminDashboard;
