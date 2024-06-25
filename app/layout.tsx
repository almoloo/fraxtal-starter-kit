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
        <body className={`${inter.className} antialiased`}>
          <Header />
          <nav className="flex flex-col">
            <Link href="/">Welcome</Link>
            <Link href="/smart-contract/call">
              Call a Smart Contract method
            </Link>
            <Link href="/smart-contract/fetch">
              Fetch data from a Smart Contract
            </Link>
            <Link href="/ipfs/fetch">Fetch data/file from IPFS</Link>
            <Link href="/ipfs/upload">Upload data/file to IPFS</Link>
            <Link href="/explorer">Fetch data from the explorer</Link>
            <Link href="/asset/mint">Mint an asset</Link>
            <Link href="/asset/transfer">Transfer an asset</Link>
          </nav>
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
