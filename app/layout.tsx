import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Menu from "./components/Menu";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LedgerFy",
  description: "Go ledger Challenge by Yuri Ribeiro Felipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="md:grid md:grid-cols-[350px_1fr] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <header className="w-full h-full md:w-[95%] md:h-[95%] py-6 px-8 rounded bg-black">
              <Menu />
            </header>

            {children}
          </div>

          <footer className="w-full py-6 pb-4 bg-black md:bg-darkGray">
            <p className="text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} LedgerFy
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
