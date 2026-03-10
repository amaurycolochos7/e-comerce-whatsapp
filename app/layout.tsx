import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";

export const metadata: Metadata = {
  title: "Soluciones Tecnológicas El Inge | Licencias de Software y Servicios Técnicos",
  description: "Licencias originales de software, suscripciones digitales y servicios técnicos para computadoras y celulares en Venustiano Carranza, Chiapas.",
  keywords: "software, licencias, Office, Windows, antivirus, servicios técnicos, reparación computadoras, Chiapas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
