// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIGIEA",
  description: "Sistema de Gestión para APO-AUTIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ClerkProvider debe envolver la etiqueta <html>
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <ToastContainer />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}