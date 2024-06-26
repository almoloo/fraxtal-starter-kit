import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/provider";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fraxtal Starter Kit",
  description: "A starter kit for building Fraxtal apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body
          className={`${inter.className} antialiased min-h-screen flex flex-col`}
        >
          <Header />
          <main className="flex grow flex-col">{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
