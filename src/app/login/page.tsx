"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi setelah login berhasil
import { useUser } from "@/context/AuthContext";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { login } = useUser(); // Ambil login dari context

  // State untuk email, password, dan error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk menangani login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validasi email dan password
    if (!email || !password) {
      setError("Email dan password harus diisi.");
      setLoading(false);
      return;
    }

    try {
      // Mengirimkan data login ke API
      const response = await fetch("https://api.escuelajs.co/api/v1/users");
      const data = await response.json();

      // Mencari pengguna berdasarkan email dan password yang sesuai
      const user = data.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (!user) {
        throw new Error("Login gagal! Email atau password salah.");
      }

      // Jika berhasil login, arahkan ke halaman dashboard
      const userAuth = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      };
      login(userAuth);
      router.push("/");
    } catch (error) {
      setError("error" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Input Email */}
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md"
            placeholder="Email"
            required
          />

          {/* Input Password */}
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md"
            placeholder="Password"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Belum punya akun?{" "}
            <Link href="/register" className="text-blue-500">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
