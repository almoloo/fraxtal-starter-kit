import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/provider";
import ConnectButton from "@/components/ConnectButton";
import Link from "next/link";

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
        <body className={inter.className}>
          <header className="flex items-center justify-between">
            header
            <ConnectButton />
          </header>
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
          <footer>footer</footer>
        </body>
      </html>
    </Provider>
  );
}
