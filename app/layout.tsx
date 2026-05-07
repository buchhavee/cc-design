import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const openSauce = localFont({
  variable: "--font-open-sauce",
  display: "swap",
  src: [
    {
      path: "../public/fonts/OpenSauceOneVF.woff2",
      style: "normal",
      weight: "300 700",
    },
    {
      path: "../public/fonts/OpenSauceOneVF-Itallic.woff2",
      style: "italic",
      weight: "300 700",
    },
  ],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "CC Design A/S — Architecture · Construction Consultancy",
  description: "CC Design A/S works at the boundary between architecture, craft, and technology — delivering built environments and designed spaces that communicate precision, permanence, and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSauce.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
