import React from "react";

interface PopupProps {
  message: string;
  isVisible: boolean;
  type?: "success" | "error";
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, type, onClose }) => {
  if (!isVisible) return null;
  const headerText = type === "success" ? "Success!" : "Error!";

  const bgColor =
    type === "success"
      ? "bg-gradient-to-r from-green-400 to-blue-500"
      : "bg-gradient-to-r from-red-400 to-red-600";
  const icon =
    type === "success" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

  return (
    <div
      className={`fixed top-24 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-slide-in`}
      style={{ zIndex: 1000 }}
    >
      <span className="bg-white rounded-full p-2 text-green-500">{icon}</span>
      <div>
        <h4 className="text-lg font-bold">{headerText}</h4>
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-auto bg-transparent text-white hover:text-gray-300 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Popup;
