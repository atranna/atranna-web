import type { Metadata } from "next";
import Script from "next/script";
import { ToasterProvider } from "@/components/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atranna",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Script src="/runtime-config" strategy="beforeInteractive" />
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
