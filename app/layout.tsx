import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nepal Air Quality Index",
  description: "Air Pollution Index in Nepal. All the data are taken from waqi.info.",
  // give me more metadata for seo
  metadataBase: new URL("https://nepal-air-quality-index.vercel.app/"),
  openGraph:{
    title: "Nepal Air Quality Index",
    description: "Air Pollution Index in Nepal. All the data are taken from waqi.info.",
    url: "https://nepal-air-quality-index.vercel.app/",
    siteName: "Nepal Air Quality Index",
    images: [
      {
        url: "https://nepal-air-quality-index.vercel.app/favicon.ico",
        width: 200,
        height: 200,
        alt: "Nepal Air Quality Index",
      },
    ],
    locale: "en-US",
  }


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
