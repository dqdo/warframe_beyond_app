import React from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  if (!show) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg text-white bg-green-600 transition-all duration-300 whitespace-nowrap
        ${show ? "opacity-100" : "opacity-0"}`}
    >
      {message}
      <button
        className="ml-3 text-sm underline cursor-pointer"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
