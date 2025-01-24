import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 mt-6">
      <p className="text-sm">
        © {new Date().getFullYear()} Muhammad Syifa Surya Saputra. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
