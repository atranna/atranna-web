import type { Metadata } from "next";
import Script from "next/script";
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
      </body>
    </html>
  );
}
