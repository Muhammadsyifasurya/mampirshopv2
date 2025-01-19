import React from "react";

interface PopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed top-24 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-slide-in"
      style={{ zIndex: 1000 }}
    >
      <span className="bg-white rounded-full p-2 text-green-500">
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <div>
        <h4 className="text-lg font-bold">Succes!</h4>
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
