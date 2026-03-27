import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LegalGen Bolivia - Generador de Contratos Legales",
  description:
    "Genera contratos legales válidos en Bolivia. Compraventa, alquiler, trabajo, anticrético, préstamo y más. Rápido, fácil y profesional.",
  keywords:
    "contratos Bolivia, generador contratos, documentos legales, compraventa, alquiler, anticrético, contrato de trabajo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
