import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://ourvoiceourrights.in"),
  title: "Our Voice, Our Rights | MGNREGA District Dashboard",
  description:
    "Explore MGNREGA district-level data on employment, expenditure, and development. 'Our Voice, Our Rights' makes government data accessible, transparent, and easy to understand for every citizen.",
  keywords: [
    "MGNREGA",
    "India",
    "rural employment",
    "data dashboard",
    "open government data",
    "transparency",
    "Our Voice Our Rights",
    "village development",
    "district performance",
  ],
  authors: [{ name: "Our Voice, Our Rights Team" }],
  creator: "Our Voice, Our Rights",
  publisher: "Open Government Initiative",
  openGraph: {
    title: "Our Voice, Our Rights | MGNREGA Dashboard",
    description:
      "Track district performance under MGNREGA — transparent, accessible, and citizen-friendly open data visualization.",
    siteName: "Our Voice, Our Rights",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Our Voice, Our Rights Dashboard Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Voice, Our Rights | MGNREGA Dashboard",
    description:
      "An open-source dashboard that visualizes MGNREGA data by district — empowering transparency and accessibility.",
    images: ["/og-image.png"],
    creator: "@ourvoiceindia",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#2563eb",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}