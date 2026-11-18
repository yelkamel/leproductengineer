import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { fontVariables } from "./fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: { default: "Le Product Engineer", template: "%s · Le Product Engineer" },
  description: "La formation pour passer de développeur à Product Engineer.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
