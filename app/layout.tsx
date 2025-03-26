import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jogos dos Postos Fitazul",
  description: "Jogos dos Postos Fitazul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`} >
        {children}
      </body>
    </html>
  );
}
