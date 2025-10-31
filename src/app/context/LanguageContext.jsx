"use client";
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("English");
  const languages = ["English", "हिन्दी", "मराठी", "தமிழ்", "বাংলা"];

  return (
    <LanguageContext.Provider
      value={{ languages, selectedLang, setSelectedLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return context;
};