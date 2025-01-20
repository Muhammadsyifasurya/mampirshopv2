"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi setelah registrasi berhasil
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  // State untuk menyimpan nama, email, password, error, dan loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk menangani registrasi
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validasi input
    if (!name || !email || !password) {
      setError("Semua kolom harus diisi.");
      setLoading(false);
      return;
    }

    try {
      // Menambahkan user baru ke API
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "customer", // Secara default role customer, bisa dikustomisasi
          avatar: "https://i.imgur.com/LDOO4Qs.jpg", // Avatar default
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal registrasi.");
      }

      // Jika registrasi berhasil, arahkan ke halaman login
      router.push("/login");
    } catch (error) {
      setError("error" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Daftar</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Input Nama */}
          <label htmlFor="name" className="text-sm font-medium">
            Nama
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-md"
            placeholder="Nama lengkap"
            required
          />

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
            {loading ? "Memuat..." : "Daftar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Sudah punya akun?{" "}
            <Link href="/login" className="text-blue-500">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
