"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const NoDataPage = ({ district, year }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700 space-y-3">
      <AlertTriangle className="w-12 h-12 text-yellow-500" />

      {/* 🔹 No data text */}
      <p className="text-xl font-semibold">
        {t("app.components.common.NoDataPage.no_data")}
      </p>

      {/* 🔹 District + Year info */}
      {district && year && (
        <p className="text-gray-500 text-sm">
          {t("app.components.common.NoDataPage.for_district_year", {
            district,
            year,
          })}
        </p>
      )}

      {/* 🔹 Suggestion */}
      <p className="text-gray-400 text-xs mt-4">
        {t("app.components.common.NoDataPage.try_different")}
      </p>
    </div>
  );
};

export default NoDataPage;
