import React from "react";

const LoadingPage = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500 mb-4"></div>
      <p className="text-lg font-medium">{text}</p>
    </div>
  );
};

export default LoadingPage;
