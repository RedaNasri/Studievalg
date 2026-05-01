import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StudieMatch – Finn studier du kan være kvalifisert for",
  description: "StudieMatch hjelper elever og studenter med å finne studier og masterprogram de kan være kvalifisert for basert på snitt eller bachelor.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={`${inter.variable} ${jakarta.variable} h-full antialiased`} style={{ colorScheme: "light" }}>
      <body className="min-h-full flex flex-col" style={{ background: "#F6F9FC", color: "#0D1B2A" }}>
        {children}
      </body>
    </html>
  );
}