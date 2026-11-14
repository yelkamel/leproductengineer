import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = "Le Product Engineer · Passe de développeur à Product Engineer";
const description =
  "Une formation gratuite pour les développeurs : produit, design et tech. Des vidéos courtes, des exercices sur ton propre projet et des skills pour ton agent IA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://leproductengineer.web.app"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "Le Product Engineer", locale: "fr_FR", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
