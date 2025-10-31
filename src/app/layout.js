"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Head from "next/head";
import { translations } from "./data/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function DynamicHead() {
  const { t, selectedLang } = useLanguage();

  const title = t("app.components.layouts.layout.meta_title");
  const description = t("app.components.layouts.layout.meta_description");
  const keywords = t("app.components.layouts.layout.site_keywords");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(", ") : keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <html lang={translations[selectedLang]} />
    </Head>
  );
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <DynamicHead />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
