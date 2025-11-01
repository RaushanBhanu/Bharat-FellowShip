"use client"
import Link from "next/link";
import { useLanguage } from "./context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-linear-to-b from-orange-100 via-white to-green-100 text-center px-6 relative overflow-hidden mt-16">

      {/* Chakra background icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Ashoka_Chakra.svg"
          alt="Ashoka Chakra"
          className="w-72 h-72 animate-spin-slow"
        />
      </div>

      {/* 404 Text */}
      <h1 className="text-8xl font-extrabold text-orange-600 drop-shadow-lg mb-4 animate-bounce">
        404
      </h1>

      {/* Message */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        {t("app.notFound.oops")}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {t("app.notFound.lost_line1")}
        <br /> {t("app.notFound.lost_line2")}
      </p>

      {/* Button */}
      <Link
        href="/"
        className="bg-linear-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition transform hover:-translate-y-1 z-10"
      >
        {t("app.notFound.home_button")}
      </Link>
      {/* Footer note */}
      <p className="text-xs text-gray-500 mt-8">{t("app.notFound.footer_note")} </p>

    </div>
  );
}
