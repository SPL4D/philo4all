import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Link from "next/link";
import { BookOpen, Search, UserRound } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: "Philo4All",
  description: "A calm nonprofit philosophy reader for public-domain classics."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Philo4All home">
            <span className="brand-mark">P4</span>
            <span>Philo4All</span>
          </Link>
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/library">
              <BookOpen aria-hidden="true" size={18} />
              Library
            </Link>
            <Link href="/library?focus=search">
              <Search aria-hidden="true" size={18} />
              Search
            </Link>
            <Link href="/saved">
              <UserRound aria-hidden="true" size={18} />
              Saved
            </Link>
          </nav>
        </header>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
