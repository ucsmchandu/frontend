import React from "react";

const Button = ({ label, onClick, loading  }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 rounded-lg transition flex items-center justify-center gap-2
        ${loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }
        text-white`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {loading ? "Generating..." : label}
    </button>
  );
};

export default Button;
