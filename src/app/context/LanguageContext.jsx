"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../../../messages/en.json";
import hi from "../../../messages/hi.json";
import mr from "../../../messages/mr.json";
import gu from "../../../messages/gu.json";
import LoadingPage from "../components/common/LoadingPage";

const translations = {
  English: en,
  हिन्दी: hi,
  मराठी: mr,
  ગુજરાતી: gu,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLang, setSelectedLang] = useState("English");
  const [isLoaded, setIsLoaded] = useState(false);
  const languages = ["English", "हिन्दी", "मराठी", "ગુજરાતી"];

  //  Load language from localStorage only once
  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLang");
    if (storedLang && languages.includes(storedLang)) {
      setSelectedLang(storedLang);
    }
    setIsLoaded(true); 
  }, []);

  //  Save language changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("selectedLang", selectedLang);
    }
  }, [selectedLang, isLoaded]);

  // Helper functions (same as before)
  const getNestedValue = (obj, keyPath) =>
    keyPath.split(".").reduce((acc, key) => acc?.[key], obj);

  const replacePlaceholders = (text, values = {}) =>
    typeof text === "string"
      ? text.replace(/{(\w+)}/g, (_, key) => values[key] ?? `{${key}}`)
      : text;

  const t = (key, values = {}) => {
    const rawText = getNestedValue(translations[selectedLang], key);
    return replacePlaceholders(rawText || key, values);
  };

  //  Prevent flicker by not rendering children until language is loaded
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <LoadingPage text={"Loading language..."} />
      </div>
    );
  }

  return (
    <LanguageContext.Provider
      value={{ languages, selectedLang, setSelectedLang, t }}
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
