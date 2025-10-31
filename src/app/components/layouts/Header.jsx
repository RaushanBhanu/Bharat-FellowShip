"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { ChevronDown, Globe } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { languages, selectedLang, setSelectedLang } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-white/60 backdrop-blur-md py-4 px-3 flex justify-between md:justify-around items-center z-50">
      <h1 className="font-bold text-lg md:text-2xl text-gray-800">
        Our Voice, Our Right
      </h1>

      <div ref={dropdownRef} className="relative text-sm">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md border border-gray-400 md:px-4 py-2 transition flex md:space-x-2 items-center hover:bg-gray-100"
        >
          <span className="px-2">
            <Globe size={15} />
          </span>
          <span className="mr-2 hidden md:block">{selectedLang}</span>
          <ChevronDown size={15} className="hidden md:block" />
        </button>

        {open && (
          <div className="absolute border right-0 mt-2 w-40 rounded-md shadow-lg bg-white text-gray-800">
            <ul className="flex flex-col">
              {languages.map((lang) => (
                <li
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-orange-400/70 hover:text-white cursor-pointer"
                >
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
