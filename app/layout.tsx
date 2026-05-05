import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StudieMatch – Finn studier du kan være kvalifisert for",
  description: "StudieMatch hjelper elever og studenter med å finne studier og masterprogram de kan være kvalifisert for basert på snitt eller bachelor.",
  openGraph: {
    title: "StudieMatch – Finn studier du kan være kvalifisert for",
    description: "Skriv inn snittet ditt og se hvilke studier du kan være kvalifisert for. Basert på poenggrenser fra Samordna opptak 2025.",
    url: "https://studiematch.no",
    siteName: "StudieMatch",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "StudieMatch – Finn studier du kan være kvalifisert for",
    description: "Skriv inn snittet ditt og se hvilke studier du kan være kvalifisert for. Basert på poenggrenser fra Samordna opptak 2025.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nb" className={`${inter.variable} ${jakarta.variable} h-full antialiased`} style={{ colorScheme: "light" }}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NKVEW2ZQL1" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NKVEW2ZQL1');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col" style={{ background: "#F6F9FC", color: "#0D1B2A" }}>
        {children}
      </body>
    </html>
  );
}