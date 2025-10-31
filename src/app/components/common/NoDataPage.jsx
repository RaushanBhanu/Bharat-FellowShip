import React from "react";
import { AlertTriangle } from "lucide-react";

const NoDataPage = ({ district, year }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700 space-y-3">
      <AlertTriangle className="w-12 h-12 text-yellow-500" />
      <p className="text-xl font-semibold">No data available</p>
      {district && year && (
        <p className="text-gray-500 text-sm">
          for <b>{district}</b> in the year <b>{year}</b>.
        </p>
      )}
      <p className="text-gray-400 text-xs mt-4">
        Try selecting a different year or district.
      </p>
    </div>
  );
};

export default NoDataPage;
