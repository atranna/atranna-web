import type { Metadata } from "next";
import { ToasterProvider } from "@/components/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atranna",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
