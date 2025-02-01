"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/AuthContext";

const Register = () => {
  const router = useRouter();
  const { login } = useUser();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || !email || !password) {
      setError("Semua kolom harus diisi.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "customer",
          avatar: "https://i.imgur.com/LDOO4Qs.jpg",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal registrasi.");
      }

      // Simpan data user ke state dan arahkan ke halaman utama
      const userAuth = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
        avatar: data.avatar,
      };

      login(userAuth); // Simpan sesi pengguna
      router.push("/"); // Redirect ke halaman utama
    } catch (error) {
      setError("Terjadi kesalahan: " + error);
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
