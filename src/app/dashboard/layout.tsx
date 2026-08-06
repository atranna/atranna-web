import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Atranna | Dashboard",
  description: "Atranna dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
